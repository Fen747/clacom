import Users from '/imports/db/users'

const usersDef = {
    collInstance: Users,
    name: 'users',
    displayName: 'Utilisateurs',
    columns: [
        {
            name: '_id',
            displayName: 'Id'
        },
        {
            name: 'emails',
            displayName: 'Email',
            widget: 'email',
            multi: true
        },
        {
            name: 'roles',
            displayName: 'Roles',
            widget: 'list',
            multi: true,
            type: 'select',
            getOptions: () =>
                new Promise((resolve, reject) =>
                    resolve([
                        { name: 'Admin', value: 'admin' },
                        { name: 'Designer', value: 'designer' }
                    ])
                )
        }
    ],
    viewableBy: ['admin', 'designer'],
    editableBy: ['admin']
}

export default usersDef
