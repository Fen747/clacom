import { getCollConfigByName } from '/imports/ui/Crud/config'

export const mix = function(mixins, methods) {
    const mixedMethods = {}

    Object.keys(methods).map(methodName => {
        mixedMethods[methodName] = function(...args) {
            mixins.forEach(mixin => mixin.call(this, ...args))

            return methods[methodName].call(this, ...args)
        }
    })

    return mixedMethods
}

export const checkLoggedIn = function() {
    if (!this.userId)
        throw new Meteor.Error('[401] Unauthorized', 'You are not logged in')
}

export const unblock = function() {
    this.unblock()
}

export const checkCRUDCanReadCollection = function({ collName }) {
    const { viewableBy } = getCollConfigByName(collName)

    if (!Roles.userIsInRole(Meteor.userId(), viewableBy)) {
        throw new Meteor.Error(
            '[401] Unauthorized',
            'You are not authorized to access this content'
        )
    }
}

export const checkCRUDCanEditCollection = function({ collName }) {
    const { editableBy } = getCollConfigByName(collName)

    if (!Roles.userIsInRole(Meteor.userId(), editableBy)) {
        throw new Meteor.Error(
            '[401] Unauthorized',
            'You are not authorized to perform this action'
        )
    }
}

export const checkIsChoucroute = function() {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        throw new Meteor.Error(
            '[401] Unauthorized',
            'You are not authorized to perform this action'
        )
    }
}
