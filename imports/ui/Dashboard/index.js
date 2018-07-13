import React, { Component } from 'react'
import Route from 'react-router-dom/Route'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Crud from '/imports/ui/Crud'
import MediaManager from '/imports/ui/MediaManager'

const tabs = [
    { path: '/crud', component: Crud, label: 'Crud' },
    { path: '/media-manager', component: MediaManager, label: 'Media Manager' }
]

class Dashboard extends Component {
    state = {
        value: 0
    }

    handleChange = (event, value) => {
        const { match, history } = this.props

        this.setState({ value }, () => {
            history.push(`${match.url}${tabs[value].path}`)
        })
    }

    render() {
        const { match } = this.props
        const { value } = this.state

        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Dashboard
                        </Typography>
                        <Tabs value={value} onChange={this.handleChange}>
                            {tabs.map(({ label, path }) => (
                                <Tab key={path} label={label} />
                            ))}
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {tabs.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={`${match.url}${path}`}
                        component={component}
                    />
                ))}
            </div>
        )
    }
}

export default Dashboard
