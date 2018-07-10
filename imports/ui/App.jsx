import React from 'react'

//import Route from 'react-router-dom/Route'
import {BrowserRouter} from 'react-router-dom'

import {Switch, withRouter} from 'react-router-dom'
import {withTracker} from 'meteor/react-meteor-data'


import Login from './Login'
import Signup from './Signup'
import ConditionnalRoute from './Components/ConditionnalRoute'
import Crud from './Crud';

class App extends React.Component{

handleLogout = ()=>{
    Meteor.logout()
    //this.props.history.push('/')

}

    render(){
        const {uid, logginin} = this.props

        return(
            <div className="fcol">
                <BrowserRouter>
                    <Switch>
                        <ConditionnalRoute exact condition={!uid} path='/login' component={Login} />
                        <ConditionnalRoute exact condition={!uid} path='/signup' component={Signup} />
                        <ConditionnalRoute exact condition={uid} redirect='/login' path='/' component={()=><div>Hello</div>} />
                        <ConditionnalRoute exact condition={uid && Roles.userIsInRole( uid, 'admin' )} path='/admin' component={Crud} />
                    </Switch>
                </BrowserRouter>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default withTracker(props=>{
    const uid = Meteor.userId()
    const logginin = Meteor.loggingIn()

    return({uid, logginin})
}) (App)


