import Users from '/imports/db/users'

Meteor.methods({
    'users.getCreatorByDocId'({ _id }) {
        return Users.findOne(_id, { fields: { username: true } })
    }
})
