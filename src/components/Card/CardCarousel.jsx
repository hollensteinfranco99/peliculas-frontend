import React, { Fragment, useEffect, useState } from 'react';
import '../../css/cardCarrusel.css';
import imagenes from '../../assets/imagenPrincipal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CardCarousel = (props) => {

    let Id = `${props.categoria}${props.index}`;

    const obtenerURLImage = (posterpath) => {
        return `https://image.tmdb.org/t/p/w500/${posterpath}`;
    }
    // Sirve para que pueda sobresalir del contenedor padre las card
    const enfocar = (e) => {
        let elemento = document.getElementById(Id);
        let wrapper = elemento.parentNode.parentNode;
        wrapper.classList.add("index");

    }
    const desenfocar = (e) => {
        let elemento = document.getElementById(Id);
        let wrapper = elemento.parentNode.parentNode;

        //elemento.classList.remove("agrandar");
        wrapper.classList.remove("index");
    }
    const Seleccionar = () =>{
        props.SeleccionarCard(props.pelicula[0].id);
        props.openModal(true);
    }
    return (
        <Fragment>
            <div id={`${props.categoria}${props.index}`}
                onMouseOut={(e) => desenfocar(e)} onMouseOver={(e) => enfocar(e)} className='contenedor'>
                <LazyLoadImage src={obtenerURLImage(props.pelicula[0].poster_path)} alt={props.pelicula[0].title} />
                <div className='tarjeta-cuerpo'>
                    <section className='primer-cuerpo'>

                        <article aria-label='incluye-prime' className='txt-prime w-100 mb-2 ms-1'>
                            <div className='bg-info icon-check'>
                                <FontAwesomeIcon className='fa-xs' icon={faCheck}></FontAwesomeIcon>
                            </div>
                            <span>Se incluye con prime</span>
                        </article>

                        <article className='btn-play'>
                            <button onClick={()=> Seleccionar()} aria-label='play'>
                                <FontAwesomeIcon className='icon-play fa fa-lg' icon={faPlay} />
                            </button>
                        </article>

                        <span className='txt-reproducir'> Reproducir </span>

                        <article aria-label='boton-check-mas'>

                            <button className='btn-check-mas fa fa-lg' aria-label='btn-agregar'>
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            </button>

                            <button className='btn-check-mas fa fa-lg' aria-label='btn-mas'>
                                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                            </button>
                        </article>
                        <article className='contenedor-info-card-inicio w-100 text-center'>
                                <h4 className='card-titulo'>{props.pelicula[0].title}</h4>
                        </article>
                    </section>

                </div>
            </div>
        </Fragment>
    );
};

export default CardCarousel;