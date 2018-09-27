//teht2.1-2.5

import React from 'react'

const Opohjelma = ({kurssit}) => { 
  return(
    <div>
      <h1>{'Opetusohjelma'}</h1>
         {kurssit.map(kurssi => <Kurssi key={kurssi.id} nimi={kurssi.nimi} osat={kurssi.osat} />)}
   </div>
  )
}

const Kurssi = ({nimi, osat}) => {
  const tehtMaara = osat.map( s => s.tehtavia)
  return(
    <div>
      <h2>{nimi}</h2>
      <ul>
        {osat.map(osa => <Sisalto key={osa.id} osa={osa.nimi} teht={osa.tehtavia}/>)}
      </ul>
      <p>yhteensä <Summa arvot={tehtMaara}/> tehtävää</p>
   </div>
  )
}

const Sisalto = ({ osa, teht }) => {
  return (
    <li>{osa} {teht}</li>
  )
}

const Summa = ({arvot}) => {
  /*let sum = 0
  for (let i = 0; i < arvot.length; i++) {
    sum += arvot[i]
  }
  */
   const sum = arvot.reduce((t,a) => t+a);
   return(sum)
}


export default Opohjelma