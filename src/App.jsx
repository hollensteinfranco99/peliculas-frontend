import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Inicio from './components/Inicio';
import ListasPeliculas from "./components/Lista/ListasPeliculas";
import Navegacion from './common/Navegacion';
import PiePagina from './common/PiePagina';
import ListasSeries from './components/ListaSeries/ListaSeries.jsx';
import ListaBusqueda from './components/BuscarFiltradoLista/ListaBusqueda';

function App() {
  return (
    <Fragment>
      <Router>
        <Navegacion></Navegacion>
        <Routes>
          <Route exact path='/' element={<Inicio></Inicio>}></Route>
          <Route exact path='/series' element={<ListasSeries></ListasSeries>}></Route>
          <Route exact path='/peliculas' element={<ListasPeliculas></ListasPeliculas>}></Route>
          <Route path="/resultados" element={<ListaBusqueda></ListaBusqueda>} />

        </Routes>
        <PiePagina></PiePagina>
      </Router>
    </Fragment>
  );
}

export default App;
