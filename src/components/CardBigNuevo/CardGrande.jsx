import React, { Fragment } from 'react';
import '../../css/cardGrande.css';

const CardGrande = (props) => {

    const obtenerURLImage = (posterpath)=>{
        return `https://image.tmdb.org/t/p/w500/${posterpath}`;
    }
    const animarCard = (e) =>{

    }

    return (
        <Fragment>
        <article id={"S"+props.index} onMouseOver={(e)=>{animarCard(e)}} onMouseLeave={(e)=>{animarCard(e)}} name="slide" className="slide">
            <img className="primera-imagen" src={obtenerURLImage(props.pelicula[0].poster_path)} alt="apex" />
            <section className="contenedor-texto-primario">
                <article className="contenedor-texto-secundario">
                    <h2 className="titulo">Deadpool</h2>
                    <div className="contenedor-reproductor">
                    <div className="contenedor-btn-reproducir">
                        <button className="btn-reproducir"><i className="fa-solid fa-play fa-2x"></i></button>
                    </div>
                    <span className="txt-reproducir">Reproducir</span>
                    <div>
                        <button className="btn-mas"><i className="fa-solid fa-plus fa-xl"></i></button>
                        <button className="btn-mas"><i className="fa-solid fa-ellipsis fa-xl"></i></button>
                    </div>
                </div>
                <div className="contenedor-incluye-prime">
                    <i className="fa-solid fa-check"></i>
                    <span>Se incluye con Prime</span>
                </div>
            </article>
            </section>
            <div className="degradado"></div>
            </article>
    </Fragment>
    );
};

export default CardGrande;