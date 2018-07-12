import Users from '/imports/db/users'

Meteor.methods({
    'users.getCreatorByDocId'({ _id }) {
        return Users.findOne(_id, {
            fields: { lastname: true, firstname: true }
        })
    }
})
