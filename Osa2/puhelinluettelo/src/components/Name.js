import React from 'react'

const Name = ({name, onChange}) => {
    return (
        <div>name: <input value={name} onChange={onChange}/></div>
    )
}

export default Name