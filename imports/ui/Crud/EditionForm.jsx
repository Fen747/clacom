import React from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import EditionWidgets from './editionWidgets'

class EditionForm extends React.Component {
    state = {
        document: {}
    }

    componentWillReceiveProps({
        show,
        ongoingEdition: editing,
        currentCollection: { columns }
    }) {
        if (this.props.show === false && show === true) {
            const document = {}

            columns.forEach(
                ({ type, name, derivedData = false, notEditable }) => {
                    if (
                        name === '_id' ||
                        derivedData ||
                        (notEditable && !editing)
                    )
                        return

                    switch (type) {
                        case 'date': {
                            document[name] = editing
                                ? editing[name]
                                : new Date()
                            break
                        }
                        case 'email': {
                            document[name] = editing ? editing[name] : ''
                            break
                        }
                        case 'select': {
                            document[name] = editing ? editing[name] : ''
                            break
                        }
                        case 'url': {
                            document[name] = editing ? editing[name] : ''
                            break
                        }
                        case 'number': {
                            document[name] = editing ? editing[name] : 0
                            break
                        }
                        default: {
                            document[name] = editing ? editing[name] : ''
                            break
                        }
                    }
                }
            )

            this.setState({ document })
        }
    }

    handleCancel = () => {
        this.props.onClose()
    }

    handleCreate = () => {
        const { document } = this.state
        const {
            onClose,
            currentCollection: { name: collName }
        } = this.props

        Meteor.call('crud.create', { document, collName }, (e, result) => {
            if (e) {
                console.error(e)
                toast.error(e.details)
            } else {
                toast.success('Item successfuly created')
                onClose(true)
            }
        })
    }

    handleEdit = () => {
        const { document } = this.state
        const {
            onClose,
            currentCollection: { name: collName },
            ongoingEdition: { _id }
        } = this.props

        Meteor.call('crud.edit', { document, collName, _id }, (e, result) => {
            if (e) {
                console.error(e)
                toast.error(e.details)
            } else {
                toast.success('Item successfuly updated')
                onClose(true)
            }
        })
    }

    handleChange = (attr, value) => {
        const { document } = this.state

        this.setState(
            {
                document: {
                    ...document,
                    [attr]: value
                }
            },
            () => console.log('document updated', this.state.document)
        )
    }

    render() {
        const {
            currentCollection: { name, columns },
            show,
            ongoingEdition
        } = this.props
        const { document } = this.state
        const action = ongoingEdition ? 'Edit' : 'Create'

        console.log(this.props)

        return (
            <Dialog open={show}>
                <DialogTitle>
                    {action} a new item in {name}
                </DialogTitle>
                <DialogContent>
                    {columns.map(
                        ({
                            name,
                            type = 'text',
                            derivedData = false,
                            notEditable = false,
                            ...columnConfig
                        }) => {
                            if (name === '_id' || derivedData) return null

                            const Widget = EditionWidgets[type]

                            return (
                                <div key={name} className="fcol">
                                    <Widget
                                        onChange={this.handleChange}
                                        attribute={name}
                                        {...columnConfig}
                                        disabled={notEditable}
                                        value={document[name]}
                                        ongoingEdition={ongoingEdition}
                                    />
                                </div>
                            )
                        }
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button
                        variant="raised"
                        color="primary"
                        onClick={
                            ongoingEdition ? this.handleEdit : this.handleCreate
                        }
                    >
                        {action}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EditionForm
