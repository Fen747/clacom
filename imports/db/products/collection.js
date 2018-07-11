import schema from './schema'

const Products = new Mongo.Collection('products')

Products.attachSchema(schema)

export default Products
