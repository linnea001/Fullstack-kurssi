//teht2.6-2.10
import React from 'react';
import Note from './components/Note'
import InputField from './components/InputField'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          id:'Arto Hellas',
          number: '12345'
          //id:1}
        }
      ],
      newPerson:'',
      newNumber:'',
      filter:''
    }
  }


  addPerson = (event) => {
    event.preventDefault()

    const newDetails = {
      name: this.state.newPerson,
      // id: this.state.persons.length + 1
      id: this.state.newPerson,
      number: this.state.newNumber
    }
    
   
    const exists = this.state.persons.filter(item => item.name === newDetails.name)
    if (exists.length === 0) {
      const updated = this.state.persons.concat(newDetails)
      this.setState({persons:updated, newPerson:'', newNumber:''})
    } else {
        alert('nimi on jo luettelossa')
    }
  }

  handlePersonChange = (event) => {
    this.setState({ newPerson: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }



  render() {
    const filtered = this.state.persons.filter(item => item.name.includes(this.state.filter))
 
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <h2>Hae nimiä</h2>
        <InputField
          name ={'haku'}
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <h2>Lisää nimiä</h2>
        <form onSubmit={this.addPerson}>
          <div>
            <InputField 
              name = {'nimi'} 
              value={this.state.newPerson.name}
              onChange={this.handlePersonChange}
            />
          </div>
          <div>
            <InputField
              name = {'numero'}
              value={this.state.newPerson.number}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <div>     
            {filtered.map(person => <Note key={person.name} note={person.name} number={person.number}/>)}
          </div>
      </div>
    )
  }
}

export default App