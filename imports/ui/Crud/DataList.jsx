import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import Placeholder from '/imports/ui/Components/Placeholder'
import Widgets from './widgets'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'

class DataList extends React.Component {
    handleRemove = ({
        currentTarget: {
            dataset: { docid: documentId }
        }
    }) => {
        const {
            currentCollection: { name: collName },
            refresh
        } = this.props

        Meteor.call(
            'crud.remove',
            { documentId, collName },
            (error, result) => {
                // @TODO TOASTS
                refresh()
            }
        )
    }

    handleEdit = ({
        currentTarget: {
            dataset: { docid: documentId }
        }
    }) => {
        this.props.onEditDocument(documentId)
    }

    render() {
        const {
            data,
            loading,
            currentCollection: { columns, name },
            showIds,
            isEditable,
            classes
        } = this.props

        if (loading) {
            return <Placeholder />
        }

        return !!data.length ? (
            <TableBody>
                {data.map(line => (
                    <TableRow key={line._id}>
                        {columns.map(column => {
                            if (!showIds && column.name === '_id') return null

                            const Widget = Widgets[column.widget || 'default']
                            // if no widget is defined in the column def, then use the default widget

                            return (
                                <TableCell key={column.name}>
                                    <Widget
                                        {...line}
                                        column={column}
                                        collName={name}
                                    />
                                </TableCell>
                            )
                        })}
                        {isEditable && (
                            <TableCell>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={this.handleRemove}
                                    data-docid={line._id}
                                    className={classes.actionBtn}
                                >
                                    <DeleteIcon />
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={this.handleEdit}
                                    data-docid={line._id}
                                    className={classes.actionBtn}
                                >
                                    <EditIcon />
                                </Button>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        ) : null
    }
}

export default withStyles(theme => ({
    actionBtn: {
        minWidth: '38px'
    }
}))(
    withTracker(({ limit, currentCollection: { columns }, data }) => {
        const relationnalData = columns.filter(
            ({ widget }) => widget === 'relationnal'
        )
        const subHandlers = []

        if (relationnalData.length) {
            relationnalData.forEach(
                ({
                    name,
                    lookup: {
                        field,
                        distantColl: { name: distantCollName }
                    }
                }) => {
                    const itemIds = data
                        .map(line => line[name])
                        .filter((v, i, a) => a.indexOf(v) === i)

                    const handler = Meteor.subscribe('crud.getRelatedData', {
                        limit,
                        distantCollName,
                        itemIds,
                        field
                    })

                    subHandlers.push(handler)
                }
            )
        }

        return {}
    })(DataList)
)
