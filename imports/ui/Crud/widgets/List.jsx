import React from 'react'

const List = ({ column, ...line }) => (
    <React.Fragment>
        {line[column] && line[column].map( (role, idx)=>
            <span key={role}>
                {`${role}${ line[column].length === idx +1 ? '' : ', '}`}
            </span>
        )}
    </React.Fragment>
)

export default List