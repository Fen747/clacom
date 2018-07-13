import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

class Placeholder extends React.Component {
    state = {
        display: Meteor.isServer
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                display: true
            })
        }, this.props.timeout)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const { display } = this.state

        return display ? <CircularProgress /> : null
    }
}

Placeholder.defaultProps = { timeout: 500 }

export default Placeholder
