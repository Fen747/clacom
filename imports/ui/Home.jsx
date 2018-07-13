import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

import Button from '@material-ui/core/Button'

import { AppContext, withContext } from '/imports/ui/AppContext'
import ProductsList from './ProductsList'

const ButtonLink = props => <Link to="/admin" {...props} />

class Home extends Component {
    render() {
        const {
            context: {
                addProductToCart,
                cart: { totalVat, totalHT, shipmentFees, total, products }
            }
        } = this.props

        return (
            <div>
                <ProductsList />

                <div>{totalHT} € HT</div>
                <div>{totalVat} € TVA</div>
                <div>{shipmentFees} € frais de livraison</div>
                <div>{total} € TOTAL</div>
                <Button
                    variant="contained"
                    color="secondary"
                    component={ButtonLink}
                >
                    TEST
                </Button>
            </div>
        )
    }
}

export default withContext(AppContext)(Home)
