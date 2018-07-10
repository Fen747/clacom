//import Users from '/imports/db/users'


Meteor.methods({
    'crud.read'({page = 1, limit = 10, collName }){
        const skip = (page-1)*limit
        const query = {}
        const projection = { 
            sort:{_id:1}
        }
        const coll = Mongo.Collection.get(collName)
        const count = coll.find(query, projection).count()
        const data = coll.find(query, {limit, skip, ...projection}).fetch()
    
        return {data, count}
    }
})