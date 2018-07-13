import React from 'react'
import Switch from 'react-router-dom/Switch'
//import { ToastContainer } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css'
import loadable from 'loadable-components'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import Login from './Login'
import Signup from './Signup'
import ConditionnalRoute from './Components/ConditionnalRoute'
import Placeholder from './Components/Placeholder'
import Home from './Home'
//import Dashboard from './Dashboard'
import PrintEdition from './Print'
import { AppContext } from './AppContext'

const Dashboard = loadable(() => import('./Dashboard'), {
    LoadingComponent: Placeholder
})

const ToastContainer = loadable(() => import('react-toastify'))

class App extends React.Component {
    state = {
        cart: {
            products: [],
            vouchers: null,
            specialReduction: 0,
            shipmentFees: 0,
            totalHT: 0,
            totalVat: 0,
            total: 0
        }
    }

    componentDidMount() {
        if (Meteor.isClient) {
            const jssStyle = document.getElementById('jss-server-side')

            if (jssStyle && jssStyle.parentsNode)
                jssStyle.parentsNode.removeChild(jssStyle)
        }
    }

    handleLogout = () => {
        Meteor.logout()
    }

    getContext = () => {
        const { userId } = this.props
        const { cart } = this.state
        const { addProductToCart } = this

        return { userId, cart, addProductToCart }
    }

    addProductToCart = newProduct => {
        const { cart } = this.state
        const nextState = {}

        const productAlreadyExist = cart.products.find(savedProduct => {
            if (newProduct._id === savedProduct._id) {
                savedProduct.quantity++

                return true
            }

            return false
        })

        nextState.cart = { ...cart }

        if (!productAlreadyExist) {
            nextState.cart.products.push({ ...newProduct, quantity: 1 })
        }

        nextState.cart.totalHT = 0
        nextState.cart.totalVat = 0
        nextState.cart.total = 0

        nextState.cart.products.forEach(
            ({ price: pricePerProduct, quantity, vat }) => {
                const productTypePrice = pricePerProduct * quantity
                const VATPerProductType = (productTypePrice / 100) * vat

                nextState.cart.totalHT += productTypePrice
                nextState.cart.totalVat += VATPerProductType
                nextState.cart.total += VATPerProductType + productTypePrice
            }
        )

        if (nextState.cart.products.length) nextState.cart.shipmentFees = 8

        if (nextState.cart.total > 100) nextState.cart.specialReduction = 10

        this.setState(nextState)
    }

    render() {
        const { userId, classes } = this.props

        console.log(this.getContext())

        return (
            <div className="fcol">
                <AppContext.Provider value={this.getContext()}>
                    <Switch>
                        <ConditionnalRoute
                            exact
                            condition={!userId}
                            path="/login"
                            component={Login}
                        />
                        <ConditionnalRoute
                            exact
                            condition={!userId}
                            path="/signup"
                            component={Signup}
                        />
                        <ConditionnalRoute
                            exact
                            condition={userId}
                            redirect="/login"
                            path="/"
                            component={Home}
                        />
                        <ConditionnalRoute
                            exact
                            condition={userId}
                            redirect="/login"
                            path="/print"
                            component={PrintEdition}
                        />
                        <ConditionnalRoute
                            condition={
                                userId && Roles.userIsInRole(userId, 'admin')
                            }
                            redirect="/login"
                            path="/admin"
                            component={Dashboard}
                        />
                    </Switch>
                    <Button
                        variant="fab"
                        color="secondary"
                        className={classes.logoutBtn}
                        onClick={this.handleLogout}
                    >
                        <LogoutIcon />
                    </Button>
                </AppContext.Provider>
                <ToastContainer position="bottom-left" />
            </div>
        )
    }
}

export default withStyles(theme => ({
    logoutBtn: {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem'
    }
}))(App)
