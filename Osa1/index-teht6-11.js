// Osa 1 - tehtävät 1.6 -1.11 Unicafe
import React from 'react';
import ReactDOM from 'react-dom';


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (info) => {
  if (info.palautemaara < 1) {
    return(
      <div>
        <p>{'Palautetta ei ole vielä annettu'}</p>
      </div>
    )
  }
  else {
    return(
      <div>
        <h1>{'Tilastot'}</h1>
        <table><tbody>
        <Statistic text={'Hyvä'} value={info.hyva} unit={''}/>
        <Statistic text={'Neutraali'} value={info.neutraali}  unit={''}/>
        <Statistic text={'Huono'} value={info.huono}  unit={''}/>
        <Statistic text={'Keskiarvo'} value={((info.hyva-info.huono)/info.palautemaara).toFixed(1)}  unit={''}/>
        <Statistic text={'Positiivisia'} value={((info.hyva/info.palautemaara)*100).toFixed(1)} unit={'%'} />
        </tbody></table>
      </div>
    )
  }
}

const Statistic = ({text, value, unit}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}{unit}</td>
    </tr>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      palautemaara: 0
    }
  }

/*
hyvaa = () => {
  this.setState({ hyva: this.state.hyva + 1 })
  this.setState({ palautemaara: this.state.palautemaara +1})
}

neutraalia = () => {
  this.setState({ neutraali: this.state.neutraali + 1 })
  this.setState({ palautemaara: this.state.palautemaara +1})
}

huonoa = () => {
  this.setState({ huono: this.state.huono + 1 })
  this.setState({ palautemaara: this.state.palautemaara +1})
}
*/
palautetta = (palaute) => {
  return() => {
    this.setState({ [palaute]: this.state[palaute] + 1 })
    this.setState({ palautemaara: this.state.palautemaara +1})
  }
}


  render() {
    return (
      <div> 
        <div>
          <h1>{'Anna palautetta'}</h1>
        </div>
        <div>
          <Button
            handleClick={this.palautetta('hyva')} text="hyvä"
          />
          <Button
            handleClick={this.palautetta('neutraali')} text="neutraali"
          />
          <Button
            handleClick={this.palautetta('huono')} text="huonoa"
          />
        </div>
        <div>
          <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono}  
          palautemaara={this.state.palautemaara} />
        </div>
      </div>
    )
  }

} 
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
)
