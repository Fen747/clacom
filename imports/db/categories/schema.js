import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 30
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
    }
})
