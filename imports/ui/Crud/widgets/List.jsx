import React from 'react'

const List = ({ column, ...line }) => {
    const cellValue = line[column.name]

    return (
        <React.Fragment>
            {cellValue &&
                cellValue.map((role, idx) => (
                    <span key={role}>
                        {`${role}${cellValue.length === idx + 1 ? '' : ', '}`}
                    </span>
                ))}
        </React.Fragment>
    )
}

export default List
