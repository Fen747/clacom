import Products from '/imports/db/products'
import Categories from '/imports/db/categories'
import Users from '/imports/db/users'

const productsDef = {
    collInstance: Products,
    name: 'products',
    displayName: 'Produits',
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
            name: 'content',
            displayName: 'Content'
        },
        {
            name: 'price',
            displayName: 'Price',
            type: 'number',
            numberOptions: {
                min: '0',
                step: '0.01'
            }
        },
        {
            name: 'vat',
            displayName: 'Tva',
            type: 'number',
            numberOptions: {
                min: '0',
                step: '0.01'
            }
        },
        {
            name: 'ttc',
            displayName: 'TTC',
            widget: 'ttc',
            derivedData: true,
            isSortable: false
        },
        {
            name: 'category',
            displayName: 'Catégorie',
            type: 'select',
            widget: 'relationnal',
            lookup: {
                distantColl: {
                    name: 'categories',
                    instance: Categories
                },
                field: 'name'
            },
            getOptions() {
                return new Promise((resolve, reject) => {
                    Meteor.call('categories.getAll', (error, categories) => {
                        if (error) return reject(error)

                        const formatedCategories = categories.map(
                            ({ _id, name }) => ({ name, value: _id })
                        )

                        resolve(formatedCategories)
                    })
                })
            }
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
    editableBy: ['--admin']
}

export default productsDef
