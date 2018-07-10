import { rejects } from "assert";

export const collections = [
    {
        name: 'users', 
        columns: [
            {   name: '_id',
                displayName: 'Id',
            },
            {
                name: 'emails',
                displayName: 'Email',
                widget: 'email',
                multi: true,
            },
            {
                name:'roles',
                displayName: 'Roles',
                widget: 'list',
                multi: true,
                type: 'select',
                getOptions: () => new Promise( ( resolve, reject ) => resolve(['admin', 'designer']) )
                /*
                getOptions(  ){
                    return new Promise( ( resolve, reject ) => {
                        Meteor.call('crud.getCategories', '', ( error, result ) => {
                            if ( error ) return reject( error )
                            
                            resolve( result )
                        })
                    })
                }
                */
            }
        ],
        viewableBy: [
            'admin',
            'designer'
        ],
        editableBy: [
            'admin',
        ]
    },
    {
        name: 'products',
        columns: [
            {
                name: '_id',
                displayName: 'Id'
            },
            {
                name: 'name',
                displayName: 'Name',
            },
            {
                name: 'price',
                displayName: 'Price',
            
            },
            {
                name: 'content',
                displayName: 'Content',
            },
            {
                name: 'vat',
                displayName: 'Tva',
            },
            {
                name: 'ttc',
                displayName: 'TTC',
                widget: 'ttc'
            }
        ],
        viewableBy: [
            'admin',
            'designer'
        ],
        editableBy: [
            'admin',
        ]
    }
]