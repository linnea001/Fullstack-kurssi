// teht 1.4
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

const Sisalto = (sis) => {
    return (
        <div>
           <Osa nimi={sis.osat[0].nimi} tehtavia={sis.osat[0].tehtavia}/>
           <Osa nimi={sis.osat[1].nimi} tehtavia={sis.osat[1].tehtavia}/>
           <Osa nimi={sis.osat[2].nimi} tehtavia={sis.osat[2].tehtavia}/>
        </div>
    )  
  }

const Yhteensa = (arvot) => {
    return (
        <div>
            <p>yhteensa {arvot.osat[0].tehtavia + arvot.osat[1].tehtavia +arvot.osat[2].tehtavia} </p>
        </div>
    )
}


const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  
    return (
      <div>
         <Otsikko nimi={kurssi} />
         <Sisalto osat={osat} />      
         <Yhteensa osat={osat} />
      </div>
    )
  }

ReactDOM.render(
    <App />,
    document.getElementById('root')
)


