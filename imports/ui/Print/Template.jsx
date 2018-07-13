import React, { Component } from 'react'

import { withContext } from '/imports/ui/AppContext'
import { PrintContext } from './index'

class Template extends Component {
    render() {
        return <div />
    }
}

export default withContext(PrintContext)(Template)
