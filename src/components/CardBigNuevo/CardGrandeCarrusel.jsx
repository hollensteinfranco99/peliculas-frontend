import React, { Fragment, useState, useEffect } from 'react';

import CardGrande from './CardGrande';
import '../../css/cardGrande.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

//AppJs
import { consultarScroll, arrowAction } from '../../js/cardBig.js';

const CardGrandeCarrusel = () => {

    const [movie, setmovie] = useState([]);

    useEffect(() => {
        consultarApi();
    }, []);


    const consultarApi = async () => {
        /*await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=67b4f5eb3a33cc8b142ade072be71f55")
            .then(response => response.json())
            .then(data => {
                setmovie(data.results);
            }).catch(error => console.log(error));*/
            await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=67b4f5eb3a33cc8b142ade072be71f55")
            .then(response => response.json())
            .then(data => {
                setmovie(data.results);
            }).catch(error => console.log(error));
    
    }

    return (
        <section id='wrapper-big' className="wrapper">
            <FontAwesomeIcon onClick={() => arrowAction("left")} icon={faChevronLeft} className="arrow desactivar" id="left" />
            <section id='carousel-grande' className="carousel snaps-inline">
                {
                    movie.map((pelicula) => {
                        return <CardGrande pelicula={[pelicula]} index={pelicula.id} key={pelicula.id}></CardGrande>
                    })
                }
            </section>
            <FontAwesomeIcon onClick={() => arrowAction("right")} icon={faChevronRight} className="arrow" id="right" />
        </section>
    );
};

export default CardGrandeCarrusel;