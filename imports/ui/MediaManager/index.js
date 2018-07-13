import React, { Component } from 'react'

class MediaManager extends Component {
    componentDidMount() {
        Meteor.call('mediamanager.listdirectory', '/', (error, result) => {
            if (error) console.error(error)
            else console.log(result)
        })
    }

    render() {
        return <div>Test</div>
    }
}

export default MediaManager
