import React from 'react'

const Persons = ({ persons, search, deletePerson }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.id}>
            {person.name} {person.number} {'    '}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Persons