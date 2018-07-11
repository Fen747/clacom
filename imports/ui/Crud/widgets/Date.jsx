import React from 'react'
import moment from 'moment'

const Date = ({ column: { name }, collName, ...line }) => {
    return moment(line[name]).format('dddd, MMMM Do YYYY')
}

export default Date
