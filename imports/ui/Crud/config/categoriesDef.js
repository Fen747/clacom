import Categories from '/imports/db/categories'
import Users from '/imports/db/users'

const categoriesDef = {
    collInstance: Categories,
    name: 'categories',
    displayName: 'Catégories',
    columns: [
        {
            name: '_id',
            displayName: 'Id'
        },
        {
            name: 'name',
            displayName: 'Name'
        },
        {
            name: 'createdAt',
            displayName: 'Created at',
            widget: 'date',
            notEditable: true
        },
        {
            name: 'createdBy',
            displayName: 'Created by user',
            widget: 'relationnal',
            notEditable: true,
            lookup: {
                distantColl: {
                    name: 'users',
                    instance: Users
                },
                field: 'username'
            }
        }
    ],
    viewableBy: ['admin', 'designer'],
    editableBy: ['admin']
}

export default categoriesDef
