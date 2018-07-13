import React from 'react'

import InputForm from './InputForm'
import Template from './Template'

export const PrintContext = React.createContext()

class PrintEdition extends React.Component {
    state = {
        focusedOn: '',
        zones: ['name', 'phoneNumber', 'email'],
        values: {}
    }

    handleChangeFocus = focusedOn => {
        this.setState({ focusedOn })
    }

    handleChangeValue = ({ focusedOn, newValue }) => {
        const { values } = this.state

        this.setState({ values: { ...values, [focusedOn]: newValue } })
    }

    getContext = () => {
        const { focusedOn, zones, values } = this.state
        const { handleChangeFocus } = this

        return {
            focusedOn,
            zones,
            handleChangeFocus,
            values
        }
    }

    render() {
        return (
            <PrintContext.Provider value={this.getContext()}>
                <InputForm />
                <Template />
            </PrintContext.Provider>
        )
    }
}

export default PrintEdition
