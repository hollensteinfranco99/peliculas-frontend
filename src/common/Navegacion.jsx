import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagenes from '../assets/imagenPrincipal'
import "../App.css";
import { Form, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navegacion = () => {

    let bool = 0;
    const [inputChange, setInputChange] = useState(null);
    const history = useNavigate();
    // useEffect para cada actualizacion de la pagina consultar
    useEffect(() => {
        //const ancho = document.getElementById("w");
        window.addEventListener('load', opcionesNavDevice);
        window.addEventListener('resize', opcionesNavDevice);
        //ancho.innerHTML = responsiveBusquedaSmall;
    });

    const opcionesNavDevice = () => {
        let menu = document.getElementById("menudesplegable-menu");
        let iconCerrar = document.getElementById("icon-cerrar");
        let buscador = document.querySelector(".contenedor-buscar");

        iconCerrar.classList.add("d-none");
        //sacar botones del navegador
        if (window.innerWidth > 768) {
            menu.className = "menudesplegable-menu d-none";
            bool = 0;
            //cerrar buscador
            buscador.classList.remove("active");
        }

    }
    const desplegarBuscador = () => {
        // usar media query y si esta en X tamaño, usar el className para cambiar su tamaño JEJE
        //consultar en que tamaño de pantalla se encuentra
        let buscador = document.querySelector(".contenedor-buscar");
        let iconCerrar = document.getElementById("icon-cerrar");

        if (window.innerWidth > 321 && window.innerWidth < 768) {
            /*si esta en celular, agregar animacion de agrandar y habilitar boton de close*/
            buscador.classList.add("active");
            iconCerrar.classList.remove("d-none");
        }

        /*y al presionar en el icono que busque*/
    }
    const cerrarBuscador = () => {
        let iconCerrar = document.getElementById("icon-cerrar");
        let buscador = document.querySelector(".contenedor-buscar");
        let inputBuscar = document.getElementById("input-buscar");

        iconCerrar.classList.add("d-none");
        buscador.classList.remove("active");
        inputBuscar.value = "";
    }
    const desplegarMenu = () => {
        let menu = document.getElementById("menudesplegable-menu");

        if (bool == 0) {
            menu.className = "menudesplegable-menu";
            bool = 1;
        } else {
            menu.className = "menudesplegable-menu d-none";
            bool = 0;
        }

    }
    const cerrarMenu = () => {
        let menu = document.getElementById("menudesplegable-menu");

        menu.className = "menudesplegable-menu d-none";
        bool = 0;
    }
    const obtenerValorInput = (event) => {
        setInputChange(event.target.value);
    }
    const buscarPelicula = async (e) => {

        if (e.key === "Enter") {

            e.preventDefault();
            const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';


            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${inputChange}&language=es-Es`
                );

                if (!response.ok) {
                    throw new Error('No se pudo obtener resultados');
                }
                const data = await response.json();
                
                console.log(data.results);
                history("/resultados",{state: data.results})
            } catch (error) {
                console.error('Error al buscar películas:', error);
            }
        }
    }


    return (
        <Fragment>
            <Navbar className='navegador position-relative' variant="dark">
                <div className='container-fluid'>
                    <Navbar.Brand>
                        <NavLink onClick={() => { cerrarMenu() }} to="/" exact="true">
                            <img className='logo-nav' src={imagenes.logoblanco} alt="prime video" />
                        </NavLink>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <div className='menu'>
                            <Nav.Link className='menudesplegable' onClick={() => desplegarMenu()}>Explorar</Nav.Link>
                            <div id='menudesplegable-menu' className='menudesplegable-menu d-none'>
                                <NavLink onClick={() => { cerrarMenu() }} className='menudesplegable-item' to='/' exact='true'>Inicio</NavLink>
                                <NavLink onClick={() => { cerrarMenu() }} className='menudesplegable-item' to='/series' exact='true'>Series</NavLink>
                                <NavLink onClick={() => { cerrarMenu() }} className='menudesplegable-item' to='/peliculas' exact='true'>Peliculas</NavLink>
                            </div>
                        </div>
                        <NavLink className={"nav-link"} to="/" exact="true">Inicio</NavLink>

                        <NavLink className={"nav-link"} to="/series" exact="true">Series</NavLink>

                        <NavLink className={"nav-link"} to="/peliculas" exact="true">Peliculas</NavLink>
                    </Nav>

                    <Form onSubmit={buscarPelicula} id='from-buscar' className='d-flex'>
                        <div className='contenedor-buscar'>
                            <div id="buscar" className='contenedor-input'>
                                <input type="search" onClick={() => desplegarBuscador()} autoComplete='off' id='input-buscar' className='buscador me-2' placeholder='Buscar' aria-label='Buscar'
                                    onChange={(e) => obtenerValorInput(e)}
                                    onKeyDown={buscarPelicula} />
                            </div>


                            <FontAwesomeIcon onClick={() => desplegarBuscador()} id='icon-buscar' className='icon-buscar text-white' icon={faMagnifyingGlass} />

                            <FontAwesomeIcon onClick={() => cerrarBuscador()} id='icon-cerrar' className='icon-cerrar d-none text-white ms-2' icon={faX} size='lg' />
                        </div>
                    </Form>
                </div>
            </Navbar>
        </Fragment>
    );
}

export default Navegacion;
