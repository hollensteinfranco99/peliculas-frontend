let cantidad;
let paginaWidth;

/* ================ arrows icon event ==================== */
export const arrowAction = (arrow) =>{

    const firstImg = document.querySelectorAll("#carousel-grande img")[0];
    let carrusel = document.querySelector("#carousel-grande");
    let firstImgWidth = firstImg.clientWidth + 6; // obteniendo el tamaño de la imagen con el margen agregado
    let arrowElemento = document.getElementById(arrow);
    let arrows = Array.from(document.getElementsByClassName("arrow"));
    paginaWidth = window.innerWidth;

    // cargamos los carruseles bien
    // cada vez que tocamos una pelicula que se abra
    if(paginaWidth < 500){
        cantidad = 1;
    }else if(paginaWidth >= 500 && paginaWidth <= 768){
        cantidad = 2;
    }else if (paginaWidth >= 769 && paginaWidth <= 1024) { // sirve para cambiar la cantidad del slide
        cantidad = 3;
    } else if (paginaWidth >= 1025 && paginaWidth <= 1200) {
        cantidad = 4;
    } else{
        cantidad = 5;
    }

    carrusel.scrollLeft = arrow == "left" ? carrusel.scrollLeft -firstImgWidth * cantidad : carrusel.scrollLeft + firstImgWidth * cantidad;
    
    setTimeout(() => {

        if (Math.round(carrusel.scrollLeft) == (carrusel.scrollWidth - carrusel.clientWidth)
        || carrusel.scrollLeft == 0) {
            arrowElemento.classList.add("desactivar"); // desactivo boton
            
        }else{
            arrows.map(x=> x.classList.remove("desactivar"))
        }
    }, 600);
}
export const consultarScroll = (cardID) =>{
    let wrapper = document.querySelector(".wrapper");
    let coordWrapper = wrapper.getBoundingClientRect();
    let card = document.getElementById(cardID);
    // consultamos si se scrolleo para habilitar animacion card
    // sirve para ocultar el desborde
    let coordCard = card.getBoundingClientRect();
    if(coordCard.right > (coordWrapper.right + 100)){
        // sumo 100 porque al agrandar la card, excede la coordenada del wrapper levemente
        return false;
    }else{
        return true;
    }
    
}