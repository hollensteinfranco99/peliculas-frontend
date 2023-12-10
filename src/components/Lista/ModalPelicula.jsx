import React, { Fragment, useEffect, useState } from 'react';
import '../../css/pelicula.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
import YouTube from 'react-youtube';

const ModalPelicula = (props) => {
    const [movie, setMovie] = useState({})
    const [datosMovie, setDatosMovie] = useState({
        duracion: " - ",
        voteCount: " - ",
        voteAverage: 0
    });
    const [trailers, setTrailers] = useState({
        teaser: "",
        trailer:""
    });

    useEffect(() => {

        if (props.isShow == true) {
            obtenerPelicula();
        }
    }, [props.isShow]);
    useEffect(() => {
        if (Object.keys(movie).length != 0) {
            obtenerGenerosPorId();
            obtenerElencoPorId();
        }
    }, [movie]);

    const cerrarModal = () => {
        props.openModal(false);
    }
    const obtenerPelicula = () => {
        const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';
        const movieId = props.id;

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la película');
                }
                return response.json();
            })
            .then((data) => {

                const duracionEnMinutos = data.runtime; // Supongamos que data.runtime contiene la duración en minutos

                console.log(data)
                // Calcula las horas, minutos y segundos
                const horas = Math.floor(duracionEnMinutos / 60);
                const minutos = duracionEnMinutos % 60;
                const segundos = 0; // Por defecto, establecemos los segundos en 0, ya que generalmente las duraciones de películas no se dan en segundos
                // Formatea los valores en hh:mm:ss
                const duracionFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
                setDatosMovie({
                    duracion: duracionFormateada,
                    voteCount: data.vote_count,
                    voteAverage: data.vote_average
                });
                setMovie(data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos de la película:', error);
            });
    }
    const obtenerURLImagen = (url) => {
        return `https://image.tmdb.org/t/p/w780/${url}`;
    }
    const obtenerGenerosPorId = () => {
        if (movie) {
            let lista = document.getElementById('generos' + movie.id);

            movie.genres.forEach(gen => {
                let li = document.createElement("li");
                li.className = "li-genero";
                li.innerHTML += `<a class='lead a-genero' id=${gen.id} href="">${gen.name}</a>`;
                lista.appendChild(li);
            });
        }
    }
    const obtenerElencoPorId = () => {

        const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';
        const movieId = props.id;

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la película');
                }
                return response.json();
            })
            .then((data) => {

                let lista = document.getElementById('elenco' + movie.id);

                for (let index = 0; index < 5; index++) {
                    let li = document.createElement("li");
                    li.className = "li-genero";
                    li.innerHTML += `<span class='lead a-genero' id=${data.cast[index].id} href="">${data.cast[index].name}</span>`;
                    lista.appendChild(li);
                }
            })
            .catch((error) => {
                console.error('Error al obtener los datos de la película:', error);
            });
    }
    return (
        <Fragment>
            <Modal show={props.isShow} onHide={() => cerrarModal()}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <section>
                        <section className='contenedor-cartel'>
                            <article className='contenedor-img-modal'>
                                <LazyLoadImage effect='blur' src={obtenerURLImagen(movie.poster_path)} alt="" />
                            </article>
                            <h2 className='titulo-modal'>{movie.title}</h2>
                            <article className='cont-botones-modal'>
                                <button className='btn btn-outline-danger'>Reproducir</button>
                                <button className='btn btn-outline-info'>Guardar</button>
                            </article>
                        </section>
                        <section className='contenedor-info container row'>

                            <article className='col-lg-6 col-md-6 col-sm-12' aria-label='overview'>
                                <p className='lead p-4'>{movie.overview}</p>
                            </article>

                            <article aria-label='reparto' className='col-lg-6 col-md-6 col-sm-12 p-4 d-flex flex-column'>
                                <div className='d-flex'>
                                    <span className='lead li-genero'>Fecha de lanzamiento: </span>
                                    <span className='lead'>{movie.release_date}</span>
                                </div>
                                <ul id={'generos' + movie.id} className='generos-modal'>
                                    <li className='lead li-genero'>Generos:</li>
                                </ul>
                                <ul id={'elenco' + movie.id} className='generos-modal'>
                                    <li className='lead li-genero'>Elenco:</li>
                                </ul>
                                <article aria-label='grupo-info'>
                                    <div aria-label='duracion'>
                                        <span className='lead li-genero'>Duracion:</span>
                                        <span className='lead'>{datosMovie.duracion}</span>
                                    </div>
                                    <div aria-label='puntuacion'>
                                        <span className='p-2'>
                                            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                        </span>
                                        {movie ? (datosMovie.voteAverage).toFixed(2) : " - "}
                                        <span className='m-2' aria-label='cantidad-votacion'>
                                            {movie ? `(${datosMovie.voteCount})` : " - "}
                                        </span>
                                    </div>
                                </article>
                            </article>
                        </section>
                    </section>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};
export default ModalPelicula;