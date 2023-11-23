import React, { Fragment, useRef, useState } from 'react';
import imagenes from '../../assets/imagenPrincipal';
import CardCarousel from './CardCarousel';
import '../../css/cardCarrusel.css';
//SwipperJs
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from 'react';
import ModalPelicula from '../../components/Lista/ModalPelicula';

const CarouselOfCards = (props) => {

    //useState
    const [movie, setmovie] = useState([]);
    const [cardSeleccionada, setCardSeleccionada] = useState("");
    const [openModal, setOpenModal] = useState(false);
    //inicializar useEffect
    useEffect(() => {
        consultarApi();
    }, []);
    const consultarApi = async () => {

        const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';
        const genreId = props.idGenero; // Reemplaza con el ID del género "Acción"
        const language = 'es';

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=${language}&page=3`)
            .then(response => response.json())
            .then(data => {
                setmovie(data.results)
            })
            .catch(error => console.error(error));
    }
    const SeleccionarCard = (id) => {
        setCardSeleccionada(id);
    }
    const ModalMostrar = (valor) => {
        setOpenModal(valor);
    }
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={5}
            slidesPerGroupSkip={1}
            centeredSlides={false}
            keyboard={{
                enabled: true,
            }}
            breakpoints={{
                1300: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                },
                900: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                500: {
                    slidesPerView: 2,
                    slidesPerGroup: 2
                },
                350: {
                    slidesPerView: 1,
                    slidesPerGroup: 1
                }
            }}
            navigation={true}
            autoplay={true}
            modules={[Keyboard, Navigation]}
            className={"mySwiper"}
            id={props.categoria}
        >
            {
                movie.map((pelicula, index) => {
                    return <SwiperSlide key={index}>
                        <CardCarousel SeleccionarCard={SeleccionarCard} openModal={ModalMostrar} pelicula={[pelicula]} categoria={props.categoria} index={index} key={index}></CardCarousel>
                    </SwiperSlide>
                })
            }
            <article>
                {
                    <ModalPelicula openModal={ModalMostrar} isShow={openModal} id={cardSeleccionada}></ModalPelicula>}
                {/* si es un dispositivo movil, que se abra una pagina y no un modal */}
            </article>
        </Swiper>
    );
};

export default CarouselOfCards;