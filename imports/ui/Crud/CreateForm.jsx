import React from 'react'
import { toast } from 'react-toastify'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import EditionWidgets from './editionWidgets'

class CreateForm extends React.Component {
    state = {
        document: {}
    }

    componentWillReceiveProps({ show, currentCollection: { columns } }) {
        if (this.props.show === false && show === true) {
            const document = {}

            console.log(columns)

            columns.forEach(
                ({ type, name, derivedData = false, notEditable }) => {
                    if (name === '_id' || derivedData || notEditable) return

                    console.log('NOT EDITABLE ? ', notEditable)

                    switch (type) {
                        case 'date': {
                            document[name] = new Date()
                            break
                        }
                        case 'email': {
                            document[name] = ''
                            break
                        }
                        case 'select': {
                            document[name] = ''
                            break
                        }
                        case 'url': {
                            document[name] = ''
                            break
                        }
                        case 'number': {
                            document[name] = 0
                            break
                        }
                        default: {
                            document[name] = ''
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
            show
        } = this.props
        const { document } = this.state

        return (
            <Dialog open={show}>
                <DialogTitle>Create a new item in {name}</DialogTitle>
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
                        onClick={this.handleCreate}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default CreateForm
