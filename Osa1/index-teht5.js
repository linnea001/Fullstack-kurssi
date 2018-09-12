// teht 1.5
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
    console.log(sis)
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
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
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
    }
  
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />      
            <Yhteensa osat={kurssi.osat} />
        </div>

    )
  }
ReactDOM.render(
    <App />,
    document.getElementById('root')
)


