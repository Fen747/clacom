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
import { withStyles } from '@material-ui/core/styles'

import { LIMIT_OPTIONS } from './enum'
import { collections, getCollConfigByName } from './config'

import DataList from './DataList'
import CreateForm from './CreateForm'

class Crud extends React.Component {
    static initialState = {
        page: 0,
        limit: LIMIT_OPTIONS[0],
        data: []
    }

    state = {
        ...Crud.initialState,
        loading: true,
        count: 0,
        collName: '',
        showCreateModal: false
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
        const { page, limit, collName } = this.state

        Meteor.call(
            'crud.read',
            { page, limit, collName },
            (error, { data, count } = {}) => {
                if (!error) {
                    this.setState({ data, count, loading: false })
                    console.log('DATA', data)
                } else console.error(error)
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
            showCreateModal: true
        })
    }

    handleModalClose = (refresh = false) => {
        if (refresh) this.fetchData()

        this.setState({
            showCreateModal: false
        })
    }

    render() {
        const {
            page,
            limit,
            data,
            loading,
            count,
            collName,
            showCreateModal
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
                            <Button
                                onClick={this.handleCreateNewItem}
                                disabled={!collName || !isEditable}
                                color="primary"
                            >
                                New
                            </Button>
                        </ToolBar>
                        {!!collName && (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {currentCollection.columns.map(
                                            ({ displayName }, idx) => (
                                                <TableCell key={idx}>
                                                    {displayName}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                </TableHead>
                                <DataList
                                    data={data}
                                    loading={loading}
                                    currentCollection={currentCollection}
                                    refresh={this.fetchData}
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
                    <CreateForm
                        show={showCreateModal}
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
        }
    }))(Crud)
)
