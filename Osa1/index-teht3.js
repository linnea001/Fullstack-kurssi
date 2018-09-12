// teht 1.3
import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (kurssi) => {
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
        </div>
    )
}

const Osa = (tiedot) => {
    return (
        <div>
            <p>{tiedot.nimi} tehtavia {tiedot.tehtavia}</p>
        </div>
    )
}

const Sisalto = (osat) => {
    return (
      <div>
        <Osa nimi={osat.osa1} tehtavia={osat.tehtavia1}/>
        <Osa nimi={osat.osa2} tehtavia={osat.tehtavia2}/>
        <Osa nimi={osat.osa3} tehtavia={osat.tehtavia3}/>
      </div>
    )
  }

const Yhteensa = (summa) => {
    return (
        <div>
            <p>yhteensa {summa.arvo} </p>
        </div>
    )
}


  const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  
    return (
      <div>
         <Otsikko nimi={kurssi} />
         <Sisalto osa1={osa1.nimi} tehtavia1={osa1.tehtavia} osa2={osa2.nimi} tehtavia2={osa2.tehtavia} osa3={osa3.nimi} tehtavia3={osa3.tehtavia} />
         <Yhteensa arvo={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />
      </div>
    )
  }

ReactDOM.render(
    <App />,
    document.getElementById('root')
)


