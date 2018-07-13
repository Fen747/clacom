import React from 'react'

export const AppContext = React.createContext()

export const withContext = Context => Component =>
    function WithContextComponent(props) {
        return (
            <Context.Consumer>
                {value => <Component {...props} context={value} />}
            </Context.Consumer>
        )
    }
