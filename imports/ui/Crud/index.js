import React from 'react'

import {withTracker} from 'meteor/react-meteor-data'

import {LIMIT_OPTIONS} from './enum'
import DataList from './DataList'
import {collections} from './config'
import CreateForm from './CreateForm'



class Crud extends React.Component{
    static initialState = {
        page: 1,
        limit: LIMIT_OPTIONS[0],
        data:[],
    }

    state = {
        ...Crud.initialState,
        loading: true,
        count: 0, 
        collName: '',
        showCreateModal: false
    }

    handleLimitChange = ({target: {value}}) => {
        this.setState({limit: Number(value)}, () => {
            this.fetchData()
        })
    }

    fetchData = () =>{
        const { page, limit, collName } = this.state

        Meteor.call('crud.read', {page, limit, collName}, (error, {data, count})=>{
            if(!error){
                this.setState({data, count, loading:false})
            }
        })
    } 

    handleCollChange = ({target:{value: collName}}) => {
        this.setState({collName, ...Crud.initialState},  ()=>{
            this.fetchData()
        })
    }

    handleCreateNewItem = () => {
        this.setState({
            showCreateModal : true
        })
    }

    handleModalClose = () => {
        this.setState({
            showCreateModal : false
        })
    }

    render(){
        const { page, limit, data, loading, count, collName, showCreateModal } = this.state
        const { roles, userId } = this.props
        const nbPages = count/(limit*(page))
        const viewableColls = collections.filter( ({ viewableBy }) => (
            Roles.userIsInRole( userId, viewableBy )
        ))
        let currentCollection = null
        let isEditable = false

        if ( collName ) {
            currentCollection = viewableColls.find(({name})=> name === collName)
            isEditable = Roles.userIsInRole( userId, currentCollection.editableBy )
        }

        return(
            <div className="fcol">
                <select value={collName} onChange={this.handleCollChange}>
                    <option value="" disabled>
                        -
                    </option>
                    {viewableColls.map(({name})=>(
                        <option value={name} key={name}>
                            {name}
                        </option>
                    ))}
                </select>

                { !collName ?
                    <div>
                        Please, select a collection
                    </div>
                    :
                    <React.Fragment>
                        {isEditable && 
                            <div >
                                <button onClick={this.handleCreateNewItem}>New</button>
                                <CreateForm show={showCreateModal} onClose={this.handleModalClose} currentCollection={currentCollection}/>
                            </div>
                        }

                        <DataList data={data} loading={loading} currentCollection={currentCollection}/>
                        <div>
                            <select value={limit} onChange={this.handleLimitChange}>
                                {LIMIT_OPTIONS.map((opt, index)=>(
                                    <option value={opt} key={index}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <div>
                                {nbPages}
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        )
    }

}

export default withTracker(props=>{
    const roles = Meteor.user().roles
    const userId = Meteor.userId()

    return { roles, userId }
})(Crud)