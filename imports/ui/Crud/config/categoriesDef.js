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
            type: 'date',
            notEditable: true
        },
        {
            name: 'createdBy',
            displayName: 'Created by user',
            widget: 'relationnal',
            type: 'select',
            getOptions(_id) {
                return new Promise((resolve, reject) => {
                    Meteor.call(
                        'users.getCreatorByDocId',
                        { _id },
                        (error, { _id: value, lastname, firstname }) => {
                            if (error) return reject(error)

                            resolve([
                                { value, name: `${firstname} ${lastname}` }
                            ])
                        }
                    )
                })
            },
            notEditable: true,
            lookup: {
                distantColl: {
                    name: 'users',
                    instance: Users
                },
                field: 'username' // @TODO allow relational on derived data
            }
        }
    ],
    viewableBy: ['admin', 'designer'],
    editableBy: ['admin']
}

export default categoriesDef
