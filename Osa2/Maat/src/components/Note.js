//teht 2.12
import React from 'react'

const Note = ({note, total}) => {
    if (total === 1) {
        return(
            <div>
                <h1>{note.name} {note.nativeName}</h1>
                Capital: {note.capital}<br></br>
                Population: {note.population}<br></br>
                <img src={(note.flag)} alt= 'lippu' width="100px"/>
            </div>
            
        )
    } else {
        return <div>{note.name}</div>
    }
}

export default Note