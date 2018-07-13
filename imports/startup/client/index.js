import { hydrate } from 'react-dom'
import React from 'react'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { withTracker } from 'meteor/react-meteor-data'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import App from '/imports/ui/App'

const AppWithUserTracker = withTracker(props => {
    const userId = Meteor.userId()
    //const loggingin = Meteor.loggingIn()

    return { userId /*, loggingin*/ }
})(({ theme, userId }) => (
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <App userId={userId} />
        </BrowserRouter>
    </MuiThemeProvider>
))

Meteor.startup(() => {
    Tracker.autorun(computation => {
        if (Roles.subscription.ready()) {
            const theme = createMuiTheme({})

            hydrate(
                <AppWithUserTracker theme={theme} />,

                document.getElementById('render_target')
            )
            computation.stop()
        }
    })
})
