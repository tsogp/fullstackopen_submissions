import React from 'react'
import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, deletePerson }) => {
    return (
        persons.map(p => 
            <div key={p.id}>
                <h3>{p.name} {p.number}</h3>
                <button onClick={() => deletePerson(p.id)}>delete</button>
            </div>
        )
    )
}

const App3 = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService.getAll().then(response => {
            setPersons(response)
        })
    }, [])

    const handleNameChange = event => {
        setNewName(event.target.value)
    }

    const handleNumberChange = event => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = event => {
        setFilter(event.target.value)
    }

    const addPerson = event => {
        event.preventDefault()
        const ifPerson = persons.find(p => p.name === newName)
        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (ifPerson) {
            if (window.confirm(`${newName} is already in the phonebook. want to update?`)) {
                personService.update(ifPerson.id, newPerson).then(response => {
                    setPersons(persons.map(p => p.id !== ifPerson.id ? p : response))
                })
            }
        } else {
        
            personService.create(newPerson).then(() => 
                setPersons(persons.concat(newPerson))
            )
        }   
    }

    const deletePerson = id => {
        if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
            personService.del(id).then(() => {
                setPersons(persons.filter(p => p.id !== id))
            })
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
            <Persons 
                persons={filter ? persons.filter(p => 
                    p.name.toLowerCase().split(' ')[0].search(filter) !== -1) : persons
                }
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App3