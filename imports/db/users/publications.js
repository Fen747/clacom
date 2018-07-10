import Users from './collection'

Meteor.publish('users.list', function({limit=10, page=1}){
    const skip = (page-1)*limit
    const users = Users.find({}, {fields:{emails:true}, limit, skip, sort:{_id:1}})

    return users
})

