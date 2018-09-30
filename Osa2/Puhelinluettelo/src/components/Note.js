//puhelinluettelo
import React from 'react'

const Note = ({note, number, deletePerson}) => {
  return (
    <div><button onClick={deletePerson}>Poista</button> {note} {number}</div>
    )
}

export default Note