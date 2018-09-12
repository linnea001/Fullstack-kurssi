// Osa 1 - Anekdootti tehtävät  1.12-1.14

import React from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: {0:0, 1:0,2:0,3:0,4:0,5:0},
      fav:0
    }
  }


  valitse = () => {
    return() => {
      this.setState({ selected: Math.floor(Math.random()*5+1)})
    }
  }

  aanesta = () => {
    return() => {
      const kopio = {...this.state.points}
      kopio[this.state.selected] +=1
      const arvot = Object.values(kopio)
      const suurin = (Math.max( ...arvot))
      const paikka = arvot.indexOf(suurin)
      this.setState({ points: kopio})
      this.setState({ fav: paikka}) 
    }
  }


  render() {
    return (
      <div>
        <div>
           <h1>{'Anekdootti'}</h1>
            <p> {this.props.anecdotes[this.state.selected]} </p>
            <p>Saanut ääniä {this.state.points[this.state.selected]}</p>
        </div>
        <div>
          <Button
            handleClick={this.valitse()} text="seuraava"
          />
          <Button
            handleClick={this.aanesta()} text="äänestä"
          />
        </div>
        <div>
            <h1>Eniten ääniä</h1>
            <p>{this.props.anecdotes[this.state.fav]}</p>
            <p>ääniä {this.state.points[this.state.fav]}</p>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)