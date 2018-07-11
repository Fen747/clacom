import Categories from '/imports/db/categories'

Meteor.methods({
    'categories.getAll'() {
        return Categories.find().fetch()
    }
})
