import React from 'react'
import moment from 'moment'
import TextField from '@material-ui/core/TextField'

class Date extends React.Component {
    handleChange = ({ target: { value } }) => {
        const { attribute, onChange } = this.props

        onChange(attribute, new Date(value))
    }

    render() {
        const { displayName, value, disabled } = this.props

        return (
            <TextField
                label={displayName}
                value={moment(value).format('MM/DD/YYYYTHH:mm')}
                disabled={disabled}
                type="datetime-local"
                onChange={this.handleChange}
            />
        )
    }
}

export default Date
