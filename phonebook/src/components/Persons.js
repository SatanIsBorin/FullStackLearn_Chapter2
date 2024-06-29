import React from "react"
import List from './List'

const Persons = ({persons, filter, removePerson}) => {
    return persons.map((person) => person.name.indexOf(filter) === -1 ? 
         <></> : 
        <div>
            <List key={person.id} person={person} removePerson={removePerson}/>
        </div>
    )
}

export default Persons