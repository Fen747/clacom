import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'

const Relationnal = ({ column, relatedData, collName, ...line }) => (
    <React.Fragment>{relatedData}</React.Fragment>
)

export default withTracker(
    ({
        column: {
            lookup: {
                distantColl: { instance },
                field
            },
            name
        },
        collName,
        ...line
    }) => {
        const relatedDoc = instance.findOne({ _id: line[name] }) || {}
        const relatedData = relatedDoc[field] || ''

        return { relatedData }
    }
)(Relationnal)
