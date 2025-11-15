
//trabajaremos con la seccion offers del JSON
 const offersContainer = document.getElementById ('offers-container');

fetch('./dataJson/datosCafe.json')  //aqui no punto y coma que no funciona
  
   .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red o archivo no encontrado: ${response.status}`);
        }
        return response.json();
    })

    .then(data => {
        console.log(data);
        const indicesInteresados = [0 , 1 , 2 , 3 ,4];//solo mostrar ofertas que esten activas o me interesen y no todo array 
        const ofertasSeleccionadas = indicesInteresados.map(index => {
       
        return data.offers[index];
    });
        let contenido = '';
    
    // abrir el div de la card
    contenido += '<div class="row row-cols-1 row-cols-md-3 g-3">'; 
    
    
    ofertasSeleccionadas.forEach(offer => {
        
        if (offer) {
            contenido += `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <img src="${offer.image}" class="card-img-top card-img-offers" alt="${offer.title}">
                        <div class="card-body">
                            <h5 class="card-title text-center textoLogo">${offer.title}</h5>
                            <p class="textoLogo text-center fs-5 parrafoCards px-4">${offer.duration}</p>
                            <p class="textoColor text-justify parrafoCards px-4">${offer.details}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    // Cierrar el div de la card
    contenido += '</div>';

    offersContainer.innerHTML = contenido;
})

    .catch(error => console.error('Error al cargar las ofertas:', error));

