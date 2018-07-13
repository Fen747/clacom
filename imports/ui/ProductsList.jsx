import React, { Component } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { AppContext, withContext } from '/imports/ui/AppContext'
import Placeholder from '/imports/ui/Components/Placeholder'

class ProductsList extends Component {
    state = {
        products: [],
        loading: true
    }

    componentDidMount() {
        const { products } = this.state

        Meteor.call('products.getAll', { products }, (e, products) => {
            if (e) {
                console.error(e)
            } else {
                console.log(products)
                this.setState({ products, loading: false })
            }
        })
    }

    addToCart = product => event => {
        this.props.context.addProductToCart(product)
    }

    render() {
        const { products, loading } = this.state

        if (loading)
            return (
                <div>
                    <Placeholder />
                </div>
            )

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Vat</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.vat}</TableCell>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={this.addToCart(product)}
                                    >
                                        Add to cart
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default withContext(AppContext)(ProductsList)
