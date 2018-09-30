//puhelinluettelo
import React from 'react';
import Note from './components/Note'
import InputField from './components/InputField'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newPerson:'',
      newNumber:'',
      filter:'',
      message:''
    }
  }


  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }


  addPerson = (event) => {
    event.preventDefault()

    const newDetails = {
      name: this.state.newPerson,
      number: this.state.newNumber
    }    
    const exists = this.state.persons.filter(item => item.name === newDetails.name)

    // tämän nimisiä henkilöitä ei ollut, lisää henkilö
    if (exists.length === 0) {
      personService
      .create(newDetails)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response),
          newPerson:'',
          newNumber: '',
          message: response.name +' lisätty'
        })
      })
      setTimeout(() => {
        this.setState({message: null})
      }, 3000)

    // henkilö oli jo luettelossa, mutta numero oli eri
    } else {
        if (exists[0].number !== newDetails.number) {
          if(window.confirm('vaihdetaanko numero?')) {
            // muut luettelossa pysyvät samana, päivitetty listan loppuun
            const rest = this.state.persons.filter(item => item.name !== newDetails.name) 
            personService
            .update(exists[0].id, newDetails)
            .then(response => {
              this.setState({
                persons: rest.concat(response),
                newPerson:'',
                newNumber: '',
                message: 'numero vaihdettu'
              })
            })
            .catch(error => {
              personService.getAll()
                .then(response => {
                 this.setState({
                   persons: response,
                  newPerson:'',
                  newNumber:'',
                  message:'henkilö ei ollut enää luettelossa' })
                 })
            })
            setTimeout(() => {
              this.setState({message: null})
            }, 3000)
          }
        }
        // henkilö oli jo luettelossa ja numero sama
        else {
          this.setState({
            newPerson: '',
            newNumber: '',
            message: 'nimi on jo luettelossa'})
          setTimeout(() => {
            this.setState({message: null})
          }, 3000)
        }
    }
  }


  deletePerson = (id) => {
    return () => {
      personService
        .deletion(id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(n => n.id !== id),
            message: 'henkilö poistettu'
          })
        })
        .catch(error => {
          personService.getAll()
          .then(response => {
           this.setState({ persons: response })
           this.setState({ message:'henkilö ei ollut enää luettelossa' })
          })
        })
      setTimeout(() => {
        this.setState({message: null})
      }, 3000)
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
        <Notification message={this.state.message} />
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
            {filtered.map(person => <Note key={person.id} note={person.name} number={person.number}
            deletePerson={this.deletePerson(person.id)} />)}
          </div>
      </div>
    )
  }
}



export default App