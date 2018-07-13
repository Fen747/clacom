import Products from '/imports/db/products'

Meteor.methods({
    'products.getAll'() {
        return Products.find().fetch()
    }
})
