import React from 'react'

const Person = ({ person, delPerson}) => {
    return (
        <div>{person.name} {person.number} <button onClick={() => delPerson({person})}> Delete </button></div>
    )
}

export default Person