import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (props) => {
    return (
        <>
            filter shown with <input onChange={props.handleFilterChange} />
        </>
    )
}

const PersonForm = (props) => {
    return (
        <form>
            <div>
                name: <input onChange={props.handleNameChange} />
                number: <input onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={props.addPerson}>add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons }) => {
    return (
        persons.map(p => 
            <h3 key={Math.random() * 1000}>{p.name} {p.number}</h3>
        )
    )
}

const App1 = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
        })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already in the phonebook`)
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            setPersons(persons.concat(newPerson))
        }   
    }

    return (
        <div>
            <h2>Filter</h2>
            <Filter handleFilterChange={handleFilterChange} />

            <h2>add a new</h2>
            <PersonForm
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />

            <h2>Numbers</h2>
            <Persons persons={filter ? persons.filter(p => 
                p.name.toLowerCase().split(' ')[0].search(filter) != -1) : persons} 
            />
        </div>
    )
}

export default App1