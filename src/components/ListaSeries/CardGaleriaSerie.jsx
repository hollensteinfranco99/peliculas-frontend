import React, { Fragment, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../../css/galeria.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';

const CardGaleriaSerie = (props) => {
    const [episodios, setEpisodios] = useState({
        cantidadEpisodios: " - ",
        cantidadTemporadas: " - "
    });
    useEffect(() => {
        obtenerDatosPelicula();
        obtenerGenerosPelicula();
    }, [])

    const obtenerURLImage = (posterpath) => {
        return `https://image.tmdb.org/t/p/w500/${posterpath}`;
    }
    const obtenerDatosPelicula = () => {
        const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';
        const movieId = props.pelicula.id; // Reemplaza con el ID de la película que deseas consultar

        // Realiza una solicitud a la API de TMDb para obtener los videos relacionados con la película
        fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setEpisodios({
                        cantidadEpisodios: data.number_of_episodes,
                        cantidadTemporadas: data.number_of_seasons
                    });
                }
            })
            .catch((error) => {
                console.error('Error al obtener los videos relacionados con la película:', error);
            });
    }
    const obtenerGenerosPelicula = () => {
        const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';
        // Realiza una solicitud a la API de TMDb para obtener la lista de géneros
        fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`)
            .then((response) => response.json())
            .then((listaGeneros) => {
                let generos_data = [];

                if (props.pelicula && props.pelicula.genre_ids) {
                    listaGeneros.genres.forEach((gen) => {
                        if (props.pelicula.genre_ids.includes(gen.id)) {
                            generos_data.push(gen.name);
                        }
                    });
                }
                mostrarGeneros(generos_data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de géneros:', error);
            });
    }
    const mostrarGeneros = (generos) => {
        let contenedor = document.getElementById(`contenedor-generos${props.pelicula.id}`);
        if (generos.length > 0 && contenedor.children.length == 0) {

            generos.forEach((item) => {
                let nuevoSpan = document.createElement('span');
                nuevoSpan.classList.add('generos-span');
                nuevoSpan.textContent = item;
                contenedor.appendChild(nuevoSpan);
            });
        }
    }
    const Seleccionar = () => {
        props.SeleccionarCard(props.pelicula.id);
        props.openModal(true);
        props.media_type("tv");
    }
    return (
        <Fragment>
            <section onClick={() => Seleccionar()} className='card-galeria'>
                <div className='contenedor'>
                    <span className='btn btn-danger tipo-card'>Series</span>
                    <article className='contenedor-img-galeria'>
                        <LazyLoadImage effect='blur' className='card-delantera' src={obtenerURLImage(props.pelicula.poster_path)} alt={props.pelicula.name} effect='blur' />
                        <article className='card-trasera' aria-label='card-trasera'>
                            <h2 className='titulo'>{props.pelicula.name}</h2>
                            <div className='d-flex flex-wrap' id={`contenedor-generos${props.pelicula.id}`} aria-label='genero'>
                            </div>
                            <div className='contenedor-descripcion'>
                                <p className='p-2 descripcion'>
                                    {props.pelicula.overview}
                                </p>
                            </div>
                            <article className='grupo-info' aria-label='grupo-info'>
                                <div className='d-flex flex-wrap p-2' aria-label='duracion'>
                                    <span>Cantidad de episodios: {episodios.cantidadEpisodios} </span>
                                    <span>Cantidad de temporadas: {episodios.cantidadTemporadas} </span>
                                </div>
                                <div aria-label='puntuacion'>
                                    <span className='p-2'>
                                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                    </span>
                                    {props.pelicula.vote_average ? (props.pelicula.vote_average).toFixed(2) : "-"}
                                    <span className='m-2' aria-label='cantidad-votacion'>
                                        {`(${props.pelicula.vote_count})`}
                                    </span>
                                </div>
                            </article>
                            <article className='grupo-boton' aria-label='boton-check-mas'>
                                <button className='btn-check-mas fa fa-lg' aria-label='btn-mas'>
                                    <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                                </button>
                                <button className='btn-check-mas fa fa-lg' aria-label='btn-agregar'>
                                    <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
                                </button>
                            </article>
                        </article>
                    </article>
                    <article className='contenedor-txt-galeria'>
                        <h2>{props.pelicula.name}</h2>
                    </article>
                </div>
            </section>
        </Fragment>
    );
};
export default CardGaleriaSerie;