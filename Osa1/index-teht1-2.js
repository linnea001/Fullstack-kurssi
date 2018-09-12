// teht 1.1 ja 1.2
import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (kurssi) => {
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
        </div>
    )
}
/* teht 1.1
const Sisalto = (osat) => {
    return (
        <div>
            <p>{osat.nimi} tehtavia {osat.tehtavia}</p>
        </div>
    )
}
*/

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
    // const-määrittelyt
    const kurssi = 'Half Stack - sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    // teht 1.1
    // <Sisalto nimi={osa1} tehtavia={tehtavia1} />
    // <Sisalto nimi={osa2} tehtavia={tehtavia2} />
    // <Sisalto nimi={osa3} tehtavia={tehtavia3} />

    return (
      <div>
        <Otsikko nimi={kurssi} />
        <Sisalto osa1={osa1} tehtavia1={tehtavia1} osa2={osa2} tehtavia2={tehtavia2} osa3={osa3} tehtavia3={tehtavia3} />
        <Yhteensa arvo={tehtavia1 + tehtavia2 + tehtavia3} />
      </div>
    )
  }


ReactDOM.render(
    <App />,
    document.getElementById('root')
)


