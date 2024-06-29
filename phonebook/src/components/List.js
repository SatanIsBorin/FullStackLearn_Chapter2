import React from "react"

const List = ({person, removePerson}) => {
    return (
        <div>
            <li>{person.name} {person.number}</li>
            <button onClick={() => removePerson(person)}>
                delete
            </button>
        </div>
    )
} 

export default List