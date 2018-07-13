import { getCollConfigByName } from '/imports/ui/Crud/config'
import {
    mix,
    checkCRUDCanReadCollection,
    checkCRUDCanEditCollection,
    unblock,
    checkLoggedIn
} from './mixins'

const methodsRequiringEditPerm = mix(
    [checkLoggedIn, checkCRUDCanEditCollection, unblock],
    {
        'crud.create'({ document, collName }) {
            const coll = Mongo.Collection.get(collName)
            const itemId = coll.insert(document)

            return itemId
        },

        'crud.remove'({ documentId, collName }) {
            const coll = Mongo.Collection.get(collName)

            return coll.remove({ _id: documentId })
        },

        'crud.edit'({ document, collName, _id }) {
            const updatedDoc = {}
            const { columns } = getCollConfigByName(collName)

            columns.forEach(({ notEditable = false, name }) => {
                if (!notEditable && name !== '_id') {
                    updatedDoc[name] = document[name]
                } // @TIPS pas de delete, on prend seulement les clefs éditables
            })

            const coll = Mongo.Collection.get(collName)
            const itemId = coll.update(_id, { $set: { ...updatedDoc } })

            return itemId
        }
    }
)

const methodsRequiringReadPerm = mix(
    [checkLoggedIn, checkCRUDCanReadCollection, unblock],
    {
        'crud.read'({ page = 0, limit = 10, collName, sort = { _id: 1 } }) {
            const skip = page * limit
            const query = {}
            const projection = { sort }
            const coll = Mongo.Collection.get(collName)
            const count = coll.find(query, projection).count()
            const data = coll
                .find(query, { limit, skip, ...projection })
                .fetch()

            return { data, count }
        }
    }
)

Meteor.methods({
    ...methodsRequiringEditPerm,
    ...methodsRequiringReadPerm
})
