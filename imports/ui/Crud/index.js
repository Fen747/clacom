import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import TableHead from '@material-ui/core/TableHead'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'
import RefreshIcon from '@material-ui/icons/Refresh'
import green from '@material-ui/core/colors/green'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { withStyles } from '@material-ui/core/styles'

import { LIMIT_OPTIONS } from './enum'
import { collections, getCollConfigByName } from './config'

import DataList from './DataList'
import EditionForm from './EditionForm'

class Crud extends React.Component {
    static initialState = {
        page: 0,
        limit: LIMIT_OPTIONS[0],
        data: [],
        isFetching: false,
        sortBy: '_id',
        sortOrder: 1,
        ongoingEdition: null
    }

    state = {
        ...Crud.initialState,
        loading: true,
        count: 0,
        collName: '',
        showEditModal: false,
        showIds: false
    }

    handleLimitChange = ({ target: { value } }) => {
        this.setState({ limit: Number(value) }, () => {
            this.fetchData()
        })
    }

    handleChangePage = (event, page) => {
        this.setState({ page }, () => {
            this.fetchData()
        })
    }

    fetchData = () => {
        const { page, limit, collName, sortBy, sortOrder } = this.state

        this.setState({ isFetching: true })

        Meteor.call(
            'crud.read',
            { page, limit, collName, sort: { [sortBy]: sortOrder } },
            (error, { data, count } = {}) => {
                const nextState = { isFetching: false, loading: false }

                if (!error) {
                    nextState.data = data // @TODO add Toast
                    nextState.count = count
                } else console.error(error)

                this.setState(nextState)
            }
        )
    }

    handleCollChange = ({ target: { value: collName } }) => {
        this.setState({ collName, ...Crud.initialState }, () => {
            this.fetchData()
        })
    }

    handleCreateNewItem = () => {
        this.setState({
            showEditModal: true
        })
    }

    handleModalClose = (refresh = false) => {
        if (refresh) this.fetchData()

        this.setState({
            showEditModal: false,
            ongoingEdition: null
        })
    }

    handleToggleIds = ({ target: { checked: showIds } }) => {
        this.setState({ showIds })
    }

    handleSort = sortByNew => event => {
        const { sortBy, sortOrder } = this.state
        const nextState = {}

        if (sortByNew === sortBy) {
            nextState.sortOrder = sortOrder * -1
        } else {
            nextState.sortBy = sortByNew
        }

        this.setState(nextState, () => {
            this.fetchData()
        })
    }

    handleEditDocument = documentId => {
        // @TIPS Document
        const { data } = this.state
        const ongoingEdition = data.find(({ _id }) => documentId === _id)

        this.setState({ ongoingEdition, showEditModal: true })
    }

    render() {
        const {
            page,
            limit,
            data,
            loading,
            count,
            collName,
            showEditModal,
            isFetching,
            showIds,
            sortOrder,
            sortBy,
            ongoingEdition
        } = this.state
        const { userId, classes } = this.props
        const viewableColls = collections.filter(({ viewableBy }) =>
            Roles.userIsInRole(userId, viewableBy)
        )
        let currentCollection = null
        let isEditable = false

        if (collName) {
            currentCollection = getCollConfigByName(collName)
            isEditable = Roles.userIsInRole(
                userId,
                currentCollection.editableBy
            )
        }

        return (
            <div className="fcol">
                <React.Fragment>
                    <Paper>
                        <ToolBar className={classes.toolbar}>
                            <FormControl className="coll-selector">
                                <InputLabel htmlFor="coll-selection-form">
                                    Select a collection
                                </InputLabel>
                                <Select
                                    value={collName}
                                    onChange={this.handleCollChange}
                                    id="coll-selection-form"
                                >
                                    <MenuItem value="" disabled selected>
                                        -
                                    </MenuItem>
                                    {viewableColls.map(
                                        ({ name, displayName }) => (
                                            <MenuItem value={name} key={name}>
                                                {displayName}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showIds}
                                        onChange={this.handleToggleIds}
                                    />
                                }
                                label="Toggle ids"
                            />
                            <Button
                                onClick={this.handleCreateNewItem}
                                disabled={!collName || !isEditable}
                                color="primary"
                            >
                                New
                            </Button>
                            <div className={classes.fetchingWrapper}>
                                <Button
                                    onClick={this.fetchData}
                                    disabled={!collName || isFetching}
                                    variant="fab"
                                >
                                    <RefreshIcon />
                                </Button>
                                {isFetching && (
                                    <CircularProgress
                                        size={68}
                                        className={classes.fabProgress}
                                    />
                                )}
                            </div>
                        </ToolBar>
                        {!!collName && (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {currentCollection.columns.map(
                                            (
                                                {
                                                    displayName,
                                                    name,
                                                    isSortable = true
                                                },
                                                idx
                                            ) =>
                                                (name !== '_id' || showIds) && (
                                                    <TableCell key={idx}>
                                                        <TableSortLabel
                                                            active={isSortable}
                                                            direction={
                                                                sortOrder < 0
                                                                    ? 'desc'
                                                                    : 'asc'
                                                            }
                                                            onClick={this.handleSort(
                                                                name
                                                            )}
                                                        >
                                                            <Typography
                                                                color={
                                                                    sortBy ===
                                                                    name
                                                                        ? 'primary'
                                                                        : 'default'
                                                                }
                                                                style={
                                                                    sortBy ===
                                                                    name
                                                                        ? {
                                                                              fontWeight:
                                                                                  'bold'
                                                                          }
                                                                        : {}
                                                                }
                                                            >
                                                                {displayName}
                                                            </Typography>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                )
                                        )}
                                        {isEditable && (
                                            <TableCell>Actions</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <DataList
                                    data={data}
                                    loading={loading}
                                    currentCollection={currentCollection}
                                    refresh={this.fetchData}
                                    showIds={showIds}
                                    isEditable={isEditable}
                                    onEditDocument={this.handleEditDocument}
                                />
                            </Table>
                        )}
                        {collName &&
                            !data.length && (
                                <Typography variant="body2">
                                    There is no data yet in this collection
                                </Typography>
                            )}

                        <TablePagination
                            component="div"
                            count={count}
                            rowsPerPage={limit}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page'
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page'
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleLimitChange}
                            rowsPerPageOptions={LIMIT_OPTIONS}
                        />
                    </Paper>
                </React.Fragment>
                {isEditable && (
                    <EditionForm
                        ongoingEdition={ongoingEdition}
                        show={showEditModal}
                        onClose={this.handleModalClose}
                        currentCollection={currentCollection}
                    />
                )}
            </div>
        )
    }
}

export default withTracker(props => {
    /* @TIPS pour éviter de lire "roles" of undefined
    const user = Meteor.user() || {}
    const { roles = [] } = user
    */
    const userId = Meteor.userId()

    return { userId }
})(
    withStyles(theme => ({
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            '& .coll-selector': {
                width: '200px'
            }
        },
        fetchingWrapper: {
            margin: theme.spacing.unit,
            position: 'relative'
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1
        }
    }))(Crud)
)
