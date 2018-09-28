//teht2.12
import React from 'react';
import Note from './components/Note'
import InputField from './components/InputField'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter:''
    }
  }


  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }
/*
  addPerson = (event) => {
    event.preventDefault()

    const newDetails = {
      name: this.state.newPerson,
      id: this.state.persons.length + 1,
      //id: this.state.newPerson,
      number: this.state.newNumber
    }
  */  
   

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleSelection = (event) => {
    this.setState({ filter: event.target.value })
  }


  render() {
    let message = ''
    let filtered = this.state.countries.filter(item => item.name.includes(this.state.filter))
    if (filtered.length > 10) {
        filtered = []
        message = 'liian monta tulosta'
    } else if (filtered.length === 0) {
        message = 'ei tuloksia'
    } else if (filtered.length === 1) {
        message = 'yksi tulos'
    } else {
        message = 'hakutulokset'
    }
 
    return (
      <div>
        <h1>Maahaku</h1>
        <InputField
          name ={'haku'}
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <div> 
            <p>{message}</p> 
            
            {filtered.map(country => <Note key={country.name} note={country} 
            total={filtered.length} />)}
        </div>
      </div>
    )
  }
}

export default App
