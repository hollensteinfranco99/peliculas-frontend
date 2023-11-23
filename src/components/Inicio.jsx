import React, { useEffect, useState, Fragment } from 'react';
import CarouselOfCards from './Card/CarouselOfCards';
import Carrusel from './Carrusel/Carrusel';
import CardGrandeCarrusel from './CardBigNuevo/CardGrandeCarrusel';

const Inicio = () => {
    const [movies, setMovies] = useState([]);
    const [generos, setGeneros] = useState([]);
    let listaGeneros = [];

    useEffect(() => {
        consultarGeneros();
    }, []);


    const consultarGeneros = async () => {
        const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';
        const language = 'es';

        await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`)
            .then(response => response.json())
            .then(data => {
                setGeneros(data.genres);
            })
            .catch(error => console.error(error));
    }
    const listarCards = () => {
        for (let index = 0; index < generos.length; index++) {
            listaGeneros.push(
                <article key={generos[index].id} aria-label='carrusel-card-chico'>
                    <div className='contenedor-subtitulos'>
                        <h2 className='text-info ms-5 subtitulos'>Prime</h2>
                        <h2 className='ms-2 subtitulos'>{generos[index].name}</h2>
                    </div>
                    <CarouselOfCards key={index} idGenero={generos[index].id} categoria={generos[index].name}></CarouselOfCards>
                </article>
            )
            /*if(index == 2){
                    listaGeneros.push(
                        <article key={index} aria-label='carrusel-card-grande'>
                        <div className='contenedor-subtitulos'>
                            <h2 className='text-info ms-5 subtitulos'>Prime</h2>
                            <h2 className='ms-2 subtitulos'>Seguir viendo</h2>
                        </div>
                        <CardGrandeCarrusel key={generos[index].id}></CardGrandeCarrusel>
                    </article>
                    )
            }*/
        }
        return listaGeneros;
    }
    return (
        <Fragment>
            <section className='mt-5 position-relative'>
                <article className='mb-5' aria-label='slider'>
                    <Carrusel></Carrusel>
                </article>

                {listarCards()}

            </section>
        </Fragment>
    );
};

export default Inicio;