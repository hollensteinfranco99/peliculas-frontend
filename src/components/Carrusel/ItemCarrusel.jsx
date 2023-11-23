import { React, Fragment } from 'react';
import imagenes from '../../assets/imagenPrincipal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ItemCarrusel = (props) => {

    const obtenerURLImage = (posterpath) => {
        return `https://image.tmdb.org/t/p/w1280/${posterpath}`;
    }
    const Seleccionar = () =>{
        props.SeleccionarCard(props.movie.id);
        props.openModal(true);
    }
    return (
        <Fragment>
            <section className="contenedor-item">
                <article className="contenedor-texto">
                <h2 className='titulo-carrusel'>{props.movie.title}</h2>
                <p className="lead desc-carrusel">{props.movie.overview}</p>
                </article>
                <article className='contenedor-reproducir' aria-label='reproducir'>
                    <div className='reproducir'>
                        <div className='btn-play'>
                            <button onClick={()=> Seleccionar()} aria-label='play'>
                                <FontAwesomeIcon className='icon-play fa fa-lg' icon={faPlay} />
                            </button>
                        </div>
                        <span className='txt-reproducir'> Reproducir </span>
                    </div>
                    <div className='check-add' aria-label='check-add'>
                        <button className='btn-check-mas fa fa-lg' aria-label='btn-agregar'>
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </button>

                        <button className='btn-check-mas fa fa-lg' aria-label='btn-mas'>
                            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                        </button>
                    </div>
                </article>
                <article className="contenedor-img">
                    <LazyLoadImage src={obtenerURLImage(props.movie.poster_path)} alt="" />
                </article>
            </section>
        </Fragment>
    );
};

export default ItemCarrusel;