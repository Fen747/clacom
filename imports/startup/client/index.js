import {render} from 'react-dom'
import React from 'react'


import App from '/imports/ui/App'

Meteor.startup(()=>{
    Tracker.autorun( computation => {
        if ( Roles.subscription.ready() ) {
            render(
                <App />,
                document.getElementById('render_target')
            )
            computation.stop()
        }
    })
})