import React from 'react'

import TextField from '@material-ui/core/TextField'

class NumberWidget extends React.Component {
    handleChange = ({ target: { value } }) => {
        const { attribute, onChange } = this.props

        onChange(attribute, Number(value))
    }

    render() {
        const { displayName, value, disabled, numberOptions } = this.props

        return (
            <TextField
                type="number"
                label={displayName}
                value={value.toString()}
                disabled={disabled}
                onChange={this.handleChange}
                inputProps={numberOptions}
            />
        )
    }
}

export default NumberWidget
