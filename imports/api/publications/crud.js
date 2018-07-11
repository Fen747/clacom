Meteor.publish('crud.getRelatedData', function({
    distantCollName,
    field,
    limit = 10,
    itemIds
}) {
    const Coll = Mongo.Collection.get(distantCollName)
    const sort = { _id: 1 }
    const projection = { fields: { [field]: true }, limit, sort }

    return Coll.find({ _id: { $in: itemIds } }, projection)
})
