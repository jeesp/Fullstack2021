import React from 'react'

const Number = ({number, onChange}) => {
    return (
        <div>number: <input value={number} onChange={onChange}/></div>
    )
}

export default Number