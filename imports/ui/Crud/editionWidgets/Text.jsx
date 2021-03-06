import React from 'react'

import TextField from '@material-ui/core/TextField'

class Text extends React.Component {
    static defaultProps = {
        multi: false
    }

    handleChange = ({ target: { value } }) => {
        const { attribute, onChange } = this.props

        onChange(attribute, value)
    }

    render() {
        const { displayName, multi, value, disabled } = this.props

        return (
            <TextField
                multiline={multi}
                label={displayName}
                value={value}
                disabled={disabled}
                onChange={this.handleChange}
            />
        )
    }
}

export default Text
