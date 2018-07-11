import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 50
    },
    createdAt: {
        type: Date,
        label: 'Created at',
        autoValue() {
            return new Date()
        }
    },
    createdBy: {
        type: String,
        label: 'Created by user',
        autoValue() {
            return Meteor.userId()
        }
    },
    category: {
        type: String,
        label: 'Category'
    },
    price: {
        type: Number,
        label: 'Price'
    },
    vat: {
        type: Number,
        label: 'Vat',
        min: 0,
        max: 25
    },
    content: {
        type: String,
        label: 'Content',
        max: 500
    }
})
