import React, { useEffect, useState, useRef, Fragment } from 'react';
import CardGaleria from './CardGaleria';
import ModalPelicula from './ModalPelicula';
import '../../css/galeria.css';
import 'bootstrap';


const ListasPeliculas = (props) => {
    const [page, setPage] = useState(1);
    const [movie, setmovie] = useState([]);
    const [genero, setGenero] = useState("");
    const [filtrar, setFiltrar] = useState(false);
    const filtrarRef = useRef(filtrar); // tuve que usar un REF porque no se actualizaba 
    const [cardSeleccionada, setCardSeleccionada] = useState("");
    const [openModal,setOpenModal] = useState(false);

    useEffect(() => {
        ObtenerGeneros();
        CargarMasPeliculas();
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', ScrollPage);
        return () => {
            window.removeEventListener('scroll', ScrollPage);
        };
    }, [page]);
    useEffect(() => {
        filtrarRef.current = filtrar;

        if(filtrar == false){
            CargarMasPeliculas();
        }
    }, [filtrar])
    useEffect(() => {
        CargarMasPeliculasGenero();
    }, [genero]);
    const CargarGeneros = (datos) => {
        let lista = document.querySelector("#lista-generos");
        if (!lista.hasChildNodes()) {
            datos.forEach((elemento, index) => {

                let hijo = document.createElement("li");
                hijo.innerHTML += `<button id="${elemento.id}"className="dropdown-item text-white generos-pelicula">${elemento.name}</button>`;

                lista.appendChild(hijo);

                let boton = hijo.querySelector("button");
                boton.onclick = () => { FiltrarGenero(elemento.id) };
            });
        }
    }
    const ObtenerGeneros = async () => {
        const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';
        const language = 'es';

        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
            const data = await response.json();

            CargarGeneros(data.genres);
        } catch (error) {
            console.error(error);
        }
    }
    const FiltrarGenero = (id) => {
        setGenero(id);
        setFiltrar(true);
        setPage(1);
        setmovie([]);
    }
    const CargarMasPeliculas = async () => {
        try {
            let moviesUnique = [];
            let listaMovies = [];
            let api_key = "67b4f5eb3a33cc8b142ade072be71f55";
            let language = "es-ES";
            
            if (filtrarRef.current == false) {

                // consultar si dice todos o si es algun genero, y se carga uno de los 2 fetch
                await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}&language=${language}`)
                    .then(response => response.json())
                    .then(data => {
                        listaMovies = data.results;
                        // Filtra las películas duplicadas por ID
                        moviesUnique = listaMovies.filter((elemento) => !movie.some((m) => m.id === elemento.id));

                        setmovie((prev) => {
                            const newMovies = [];

                            moviesUnique.forEach((e) => {
                                if (!prev.some((movie) => movie.id === e.id)) {
                                    newMovies.push(e);
                                }
                            });

                            return [...prev, ...newMovies];
                        });
                        setPage(page + 1);
                    }).catch(error => console.log(error));
            }


        } catch (error) {
            console.error('Error al obtener mas peliculas', error);
        }
    }
    const CargarMasPeliculasGenero = async () => {
        let moviesUnique = [];
        let listaMovies = [];
        let language = 'es-ES';
        let api_key = "67b4f5eb3a33cc8b142ade072be71f55";

        if (filtrarRef.current == true) {

            await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}&with_genres=${genero}&${language}`)
                .then(response => response.json())
                .then(data => {
                    listaMovies = data.results;

                    // Filtra las películas duplicadas por ID
                    moviesUnique = listaMovies.filter((elemento) => !movie.some((m) => m.id === elemento.id));

                    setmovie((prev) => [...prev, ...moviesUnique]);
                    setPage(page + 1);
                }).catch(error => console.log(error));
        }
    }
    const BotonTodos = () => {
        if(filtrarRef.current == true){
        setFiltrar(false);
        setmovie([]);
        }
    }
    const ScrollPage = () => {
        // obtengo la altura total del body y le resto con lo que se ve, para darme el scroll total
        if (Math.round(document.body.scrollHeight - window.innerHeight) === Math.ceil(window.scrollY)) {
            if (filtrarRef.current == true) {
                CargarMasPeliculasGenero();
            } else {
                CargarMasPeliculas();
            }
        }
    }
    const SeleccionarCard = (id) =>{
        setCardSeleccionada(id);
    }
    const ModalMostrar = (valor) =>{
        setOpenModal(valor);
    }
    return (
        <Fragment>
            <section>
                <article>
                </article>
                <article className='contenedor-filtrado'>
                    <button onClick={() => BotonTodos()} className='btn-filtrado'>Todos</button>
                    <button className="btn btn-filtrado dropdown-toggle" type="button" id="dropdownMenuGeneros" data-bs-toggle="dropdown" data-bs-target="#lista-generos" aria-expanded="false">
                        Generos</button>
                    <ul id='lista-generos' aria-labelledby='dropdownMenuGeneros' className='dropdown-menu contenedor-generos'></ul>
                </article>
                <article className='lista-galeria'>
                    {
                        movie.map(pelicula => {
                            return <CardGaleria SeleccionarCard={SeleccionarCard} openModal={ModalMostrar} id={pelicula.id} key={pelicula.id} pelicula={pelicula}></CardGaleria>
                        })
                    }
                </article>
                <article>
                    {
                        <ModalPelicula openModal={ModalMostrar} isShow={openModal}  id={cardSeleccionada}></ModalPelicula>}
                    {/* si es un dispositivo movil, que se abra una pagina y no un modal */}
                </article>
            </section>
        </Fragment>
    );
};

export default ListasPeliculas;