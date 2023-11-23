import React, { Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemCarrusel from './ItemCarrusel';
import ModalPelicula from '../../components/Lista/ModalPelicula';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../../css/carrusel.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

const Carrusel = () => {

  const [movies, setMovies] = useState([]);
  const [cardSeleccionada, setCardSeleccionada] = useState("");
  const [openModal,setOpenModal] = useState(false);
  
  useEffect(() => {
    ObtenerPeliculas();
  }, [])


  const ObtenerPeliculas = async () => {
    const apiKey = '67b4f5eb3a33cc8b142ade072be71f55';

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-Es&page=1`);
      const data = await response.json();

      setMovies([...movies, ...data.results.slice(0, 5)]);

    } catch (error) {
      console.error(error);
    }
  }
  const SeleccionarCard = (id) => {
    setCardSeleccionada(id);
  }
  const ModalMostrar = (valor) => {
    setOpenModal(valor);
  }



  return (
    <Fragment>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="carrusel"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <ItemCarrusel SeleccionarCard={SeleccionarCard} openModal={ModalMostrar} movie={movie} />
          </SwiperSlide>
        ))}
        <article>
          {
            <ModalPelicula openModal={ModalMostrar} isShow={openModal} id={cardSeleccionada}></ModalPelicula>}
          {/* si es un dispositivo movil, que se abra una pagina y no un modal */}
        </article>
      </Swiper>
    </Fragment>
  );
};

export default Carrusel;

/*




        
adult
: 
false
backdrop_path
: 
"/rMvPXy8PUjj1o8o1pzgQbdNCsvj.jpg"
genre_ids
: 
(3) [28, 12, 53]
id
: 
299054
original_language
: 
"en"
original_title
: 
"Expend4bles"
overview
: 
"Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning."
popularity
: 
2316.16
poster_path
: 
"/iwsMu0ehRPbtaSxqiaUDQB9qMWT.jpg"
release_date
: 
"2023-09-15"
title
: 
"Expend4bles"
video
: 
false
vote_average
: 
6.4
vote_count
: 
392
*/