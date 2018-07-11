import schema from './schema'

const Categories = new Mongo.Collection('categories')

Categories.attachSchema(schema)

export default Categories
