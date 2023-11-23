import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useLocation } from 'react-router-dom'
import CardFiltradoLista from '../Lista/CardGaleria';
import ModalFiltradoLista from '../Lista/ModalPelicula';
import ModalSerie from '../ListaSeries/ModalSerie';
import '../../css/galeria.css';
import 'bootstrap';
import CardFiltradoSeries from '../ListaSeries/CardGaleriaSerie';
import { useNavigate } from 'react-router-dom';


const ListaBusqueda = (props) => {
    const { state } = useLocation();
    const [movie_type, setMovieType] = useState("");
    const [movie, setmovie] = useState([]);
    const [cardSeleccionada, setCardSeleccionada] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        CargarPeliculas();
    }, [state]);

    const CargarPeliculas = () => {
        setmovie(state);
    }
    const BotonTodos = () => {
        setmovie([]);
        history("/peliculas")
    }
    const SeleccionarCard = (id) => {
        setCardSeleccionada(id);
    }
    const ModalMostrar = (valor) => {
        setOpenModal(valor);
    }
    const tipoPelicula = (valor) => {
        setMovieType(valor);
    }
    return (
        <Fragment>
            <section>
                <article>
                </article>
                <article className='contenedor-filtrado'>
                    <button onClick={() => BotonTodos()} className='btn-filtrado'>Todos</button>
                </article>
                <article className='lista-galeria'>
                    {
                        movie.map((pelicula) =>
                            pelicula.media_type === "movie" ? (
                                <CardFiltradoLista
                                    SeleccionarCard={SeleccionarCard}
                                    openModal={ModalMostrar}
                                    id={pelicula.id}
                                    key={pelicula.id}
                                    pelicula={pelicula}
                                    media_type={tipoPelicula}
                                />
                            ) : (
                                <CardFiltradoSeries
                                    SeleccionarCard={SeleccionarCard}
                                    openModal={ModalMostrar}
                                    id={pelicula.id}
                                    key={pelicula.id}
                                    pelicula={pelicula}
                                    media_type={tipoPelicula}
                                />
                            )
                        )
                    }
                </article>
                <article>
                    {
                        movie_type == "movie" ?
                        <ModalFiltradoLista openModal={ModalMostrar} isShow={openModal} id={cardSeleccionada}></ModalFiltradoLista>
                        :
                        <ModalSerie openModal={ModalMostrar} isShow={openModal}  id={cardSeleccionada}></ModalSerie>
                    }
                    {/* si es un dispositivo movil, que se abra una pagina y no un modal */}
                </article>
            </section>
        </Fragment>
    );
};


export default ListaBusqueda;





