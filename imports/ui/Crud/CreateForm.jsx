import React from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import EditionWidgets from './editionWidgets'


class CreateForm extends React.Component{

    state= {
        document: {

        }
    }


   componentWillReceiveProps({show, currentCollection:{columns}}){
        if(this.props.show === false && show === true){
            const document = {}

            columns.forEach(({type, getOptions, name})=>{
                if ( name === '_id' ) return

                switch (type) {
                    case 'date' : {
                        document[name] = new Date()
                        break
                    }
                    case 'email' : {
                        document[name] = ''
                        break
                    }
                    case 'select' : {
                        document[name] = ''
                        break
                    }
                    case 'url' : {
                        document[name] = ''
                        break
                    }
                    case 'number' : {
                        document[name] = 0
                        break
                    }
                    default : {
                        document[name] = ''
                        break
                    }
                }
            })

            console.log("document", document)

            this.setState({ document })
        }
   }

    handleCancel = () => {
        this.props.onClose()
    }

    handleCreate = () => {
        console.log(this.state)
    }

    handleChange = (attr, value) => {
        const { document } = this.state

        this.setState({
            document: {
                ...document,
                [attr]: value
            }
        }, () => console.log("document updated", this.state.document))
    }

    render(){
        const {currentCollection:{name, columns}, show} = this.props
        const { document } = this.state

        return(
            <Dialog open={show}>
                <DialogTitle>
                    Create a new item in {name}
                </DialogTitle>
                <DialogContent>
                    {columns.map( ({ name, type = 'text', ...columnConfig}) =>{
                        if ( name === '_id' ) return null

                        const Widget = EditionWidgets[type]
    
                        return (
                            <div key={name} className="fcol">
                                <Widget
                                    onChange={this.handleChange}
                                    attribute={name}
                                    {...columnConfig}
                                    value={document[name]}

                                />
                            </div>
                        )
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button variant="raised" color="primary" onClick={this.handleCreate}>Create</Button>
                </DialogActions>
            
            </Dialog>
        )
    }

}

export default CreateForm