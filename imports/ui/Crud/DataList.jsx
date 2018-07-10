import React from 'react'

import Placeholder from '/imports/ui/Components/Placeholder'
import Widgets from './widgets'
import {collections} from './config'

class DataList extends React.Component{
    render(){
        const {data, loading, currentCollection: { columns }} = this.props

        if(loading){
            return <Placeholder/>
        }

        return(
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            {columns.map(( { displayName }, idx)=>(
                                <td key={idx}>{displayName}</td>
                            ))}
                        </tr>
                    </thead>
                    { !!data.length &&
                        <tbody>
                            {data.map( line =>(
                                <tr key={line._id}>
                                    {columns.map( ( { name, widget = "default" } )=>{
                                        const Widget = Widgets[widget]
    
                                        return (
                                            <td key={name}>
                                                <Widget {...line} column={name} />
                                            </td>
                                        )
                                    } ) }
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
                {!data.length && 
                    <div>
                        There is no data yet in this collection
                    </div>
                }
            </React.Fragment>
        )
    }
}

// export default withTracker( ({ limit, page }) => {
//     const subHandler = Meteor.subscribe('users.list', { limit, page })
//     const loading = !subHandler.ready()
//     const query = {}
//     const skip = (page-1)*limit
//     const projection = {fields:{emails:true}, limit, skip, sort:{_id:-1}}
//     const users = Users.find(query, projection).fetch()

//     return { users, loading }
// })  ( UsersList)

export default DataList
