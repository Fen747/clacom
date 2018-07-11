import { resolveSoa } from 'dns'
import { collections, getCollConfigByName } from '/imports/ui/Crud/config'
//import Users from '/imports/db/users'

Meteor.methods({
    'crud.read'({ page = 0, limit = 10, collName }) {
        const { viewableBy } = getCollConfigByName(collName)

        if (Roles.userIsInRole(Meteor.userId(), viewableBy)) {
            const skip = page * limit
            const query = {}
            const projection = {
                sort: { _id: 1 }
            }
            const coll = Mongo.Collection.get(collName)
            const count = coll.find(query, projection).count()
            const data = coll
                .find(query, { limit, skip, ...projection })
                .fetch()

            return { data, count }
        }

        throw new Meteor.Error(
            '[401] Unauthorized',
            'You are not authorized to access this content'
        )
    },

    'crud.create'({ document, collName }) {
        const { editableBy } = getCollConfigByName(collName)

        if (Roles.userIsInRole(Meteor.userId(), editableBy)) {
            const coll = Mongo.Collection.get(collName)
            const itemId = coll.insert(document)

            return itemId
        }

        throw new Meteor.Error(
            '[401] Unauthorized',
            'You are not authorized to perform this action'
        )
    },
    'crud.remove'({ documentId, collName }) {
        console.log(documentId, collName, 'YOLO JE REMOVE')
        const { editableBy } = getCollConfigByName(collName)

        if (Roles.userIsInRole(Meteor.userId(), editableBy)) {
            const coll = Mongo.Collection.get(collName)

            return coll.remove({ _id: documentId })
        }

        throw new Meteor.Error(
            '[401] Unauthorized',
            'You are not authorized to perform this action'
        )
    }
})
