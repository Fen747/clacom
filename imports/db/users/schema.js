import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
    username: {
        type: String,
        label: 'Username',
        max: 50
    },
    createdAt: {
        type: Date,
        label: 'Created at'
    },
    createdBy: {
        type: String,
        label: 'Created by user',
        autoValue() {
            return Meteor.userId()
        }
    },
    services: {
        //@TIPS
        type: Object,
        blackBox: true
    },
    emails: {
        type: Array
    },
    'emails.$': {
        type: Object
    },
    'emails.$.address': {
        type: String
    },
    'emails.$.verified': {
        type: Boolean
    }
})
