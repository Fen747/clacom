import usersDef from './usersDef'
import productsDef from './productsDef'
import categoriesDef from './categoriesDef'

export const collections = [usersDef, productsDef, categoriesDef]

export const getCollConfigByName = collName =>
    collections.find(({ name }) => name === collName)
