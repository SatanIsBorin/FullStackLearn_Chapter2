import React from "react"

const PersonForm = ({ addPerson, newName, newNumber, setNewName, setNewNumber }) => {
    const handleChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleChangeNumber = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm