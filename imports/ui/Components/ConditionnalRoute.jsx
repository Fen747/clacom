import React from 'react'

import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'

const ConditionnalRoute = ({
    computedProps = {},
    waitWhile = false,
    condition = true,
    component: Comp = null,
    redirect = '/',
    ...rest
}) => (
    <Route
        {...rest}
        render={props => {
            if (waitWhile) {
                return null
            }
            else if (condition) {
                return <Comp {...props} {...computedProps} />
            }
            return <Redirect to={redirect} />
        }}
    />
)

export default ConditionnalRoute