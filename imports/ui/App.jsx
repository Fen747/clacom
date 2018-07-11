import React from 'react'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Switch from 'react-router-dom/Switch'
import { withTracker } from 'meteor/react-meteor-data'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import Login from './Login'
import Signup from './Signup'
import ConditionnalRoute from './Components/ConditionnalRoute'
import Crud from './Crud'

class App extends React.Component {
    handleLogout = () => {
        Meteor.logout()
    }

    render() {
        const { uid, classes } = this.props

        return (
            <div className="fcol">
                <BrowserRouter>
                    <Switch>
                        <ConditionnalRoute
                            exact
                            condition={!uid}
                            path="/login"
                            component={Login}
                        />
                        <ConditionnalRoute
                            exact
                            condition={!uid}
                            path="/signup"
                            component={Signup}
                        />
                        <ConditionnalRoute
                            exact
                            condition={uid}
                            redirect="/login"
                            path="/"
                            component={() => <div>Hello</div>}
                        />
                        <ConditionnalRoute
                            exact
                            condition={uid && Roles.userIsInRole(uid, 'admin')}
                            redirect="/login"
                            path="/admin"
                            component={Crud}
                        />
                    </Switch>
                </BrowserRouter>
                <Button
                    variant="fab"
                    color="secondary"
                    className={classes.logoutBtn}
                    onClick={this.handleLogout}
                >
                    <LogoutIcon />
                </Button>
                <ToastContainer position="bottom-left" />
            </div>
        )
    }
}

export default withStyles(theme => ({
    logoutBtn: {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem'
    }
}))(
    withTracker(props => {
        const uid = Meteor.userId()
        //const loggingin = Meteor.loggingIn()

        return { uid /*, loggingin*/ }
    })(App)
)
