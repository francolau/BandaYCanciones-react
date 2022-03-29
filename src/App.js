import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';

function App() {

// definir el state
const [busquedaLetra, guardarBusquedaLetra] = useState ({});

const [letra, guardarLetra]= useState('');

const [info, guardarInfo] = useState({});

useEffect (() => {
  if(Object.keys(busquedaLetra). length === 0) return; // para que no se ejecute el useEffect cuando esta vacio el objeto

  const consultarApiLetra = async () => {

    const { artista, cancion } = busquedaLetra;

    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
    const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`;

    const [letra, informacion] = await Promise.all([ // el promise garantiza que se ejecuten ambas consultas al mismo tiempo
      axios(url),
      axios(url2)
    ]);

    guardarLetra(letra.data.lyrics);
    guardarInfo(informacion.data.artists[0]);

    // const resultado =  await axios(url); FORMA INCORRECTA YA QUE ESPERA A QUE TERMINE UNA CONSULTA PARA QUE INICIE LA OTRA
    // const resultado2 =  await axios(url2);

    // guardarLetra(resultado.data.lyrics);
  }
  consultarApiLetra();

},[busquedaLetra, info])

  return (
    <Fragment>
      <Formulario 
      guardarBusquedaLetra = {guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row"> 
          <div className="col-md-6">
            <Info  
            info = {info}
            />
          </div>
          <div className="col-md-6">
            <Cancion 
              letra = {letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
   
  );
}

export default App;
