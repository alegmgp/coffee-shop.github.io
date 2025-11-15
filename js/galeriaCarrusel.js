// galeria-dinamica.js

// 1. ESTRUCTURA DE DATOS COMPLETA
const galeriaData = {
    cultivo: [
        { src: "./../assets/images/cultivo/david-restrepo-p7xchIkJrJA-unsplash.jpg", alt: "Vista panorámica de cultivo de café en Brasil.", title: "Vista panorámica de cultivo de café en Brasil.", group: "cultivo" },
        { src: "./../assets/images/cultivo/dhan-sugui-AgPj0maIEEs-unsplash.jpg", alt: "Detalle de cultivo de café", title: "Detalle de cultivo de café", group: "cultivo" },
        { src: "./../assets/images/cultivo/souriish-ravindran-O3Tik-JJNaw-unsplash.jpg", alt: "Cultivo de café en Brasil.", title: "Cultivo de café en Brasil.", group: "cultivo" },
        { src: "./../assets/images/cultivo/egle-sidaraviciute-RA0ulK_q67w-unsplash.jpg", alt: "Cultivo de café en Colombia.", title: "Cultivo de café en Colombia.", group: "cultivo" },
        { src: "./../assets/images/cultivo/esteban-benites-VO0fNzSM-Z4-unsplash.jpg", alt: "Control del cultivo de café en Colombia.", title: "Control del cultivo de café en Colombia.", group: "cultivo" },
        { src: "./../assets/images/cultivo/paul-vincent-roll-c61jL_NpAn8-unsplash.jpg", alt: "Plantación de café en Colombia.", title: "Plantación de café en Colombia.", group: "cultivo" },
        { src: "./../assets/images/cultivo/coffee-2540266_1280.jpg", alt: "Detalle del cultivo de café en Colombia.", title: "Detalle del cultivo de café en Colombia.", group: "cultivo" },
        { src: "./../assets/images/cultivo/quang-nguyen-vinh-4RJnEyRTp8Y-unsplash.jpg", alt: "Detalle del cultivo.", title: "Detalle del cultivo.", group: "cultivo" },
        { src: "./../assets/images/cultivo/coffee-2540277_1280.jpg", alt: "Detalle del cultivo de café.", title: "Detalle del cultivo de café.", group: "cultivo" },
        { src: "./../assets/images/cultivo/coffee-7839536_1280.jpg", alt: "Detalle del cultivo de café.", title: "Detalle del cultivo de café.", group: "cultivo" }
    ],
    procesado: [
        { src: "./../assets/images/procesado/farming-6959637_1280.jpg", alt: "Muestra de calidad", title: "Muestra de calidad", group: "procesado" },
        { src: "./../assets/images/procesado/jon-stanford-of3z4P80IwU-unsplash.jpg", alt: "Muestra de calidad", title: "Muestra de calidad", group: "procesado" },
        { src: "./../assets/images/procesado/coffee-8406187_1280.jpg", alt: "Proceso de tostado.", title: "Proceso de tostado.", group: "procesado" },
        { src: "./../assets/images/procesado/andrey-bond-iSAt1qAFt7Q-unsplash.jpg", alt: "Proceso de tostado.", title: "Proceso de tostado.", group: "procesado" },
        { src: "./../assets/images/procesado/gregory-hayes-Jmc0PORTQ-A-unsplash.jpg", alt: "Proceso de tostado.", title: "Proceso de tostado.", group: "procesado" },
        { src: "./../assets/images/procesado/andrew-neel-66NjVBij7P8-unsplash.jpg", alt: "Proceso de tostado.", title: "Proceso de tostado.", group: "procesado" },
        { src: "./../assets/images/procesado/tim-mossholder-P59xkC9zLIE-unsplash.jpg", alt: "Procesode control de calidad.", title: "Procesode control de calidad.", group: "procesado" },
        { src: "./../assets/images/procesado/zoshua-colah-Tputyf_-lwM-unsplash.jpg", alt: "Proceso de tostado.", title: "Proceso de tostado.", group: "procesado" },
        { src: "./../assets/images/procesado/battlecreek-coffee-roasters-ITQz7_GKCQQ-unsplash.jpg", alt: "Procesode control de calidad.", title: "Procesode control de calidad.", group: "procesado" },
        { src: "./../assets/images/procesado/kwon-junho-r0Y7IHdVsw4-unsplash.jpg", alt: "Proceso de control tostado y calidad.", title: "Proceso de control tostado y calidad.", group: "procesado" }
    ],
    resultado: [
        { src: "./../assets/images/resultado/vista-superior-de-accesorios-de-cafe-sobre-la-mesa.jpg", alt: "Vista de diferentes cafés una vez finalizado el procesado.", title: "Vista de diferentes cafés una vez finalizado el procesado.", group: "resultado" },
        { src: "./../assets/images/resultado/a-c-XBsJBIKGdMo-unsplash.jpg", alt: "Resultado del procesado del café", title: "Resultado del procesado del café.", group: "resultado" },
        { src: "./../assets/images/resultado/milo-miloezger-rKYRJu0n06Y-unsplash.jpg", alt: "Resultado del procesado del café", title: "Resultado del procesado del café.", group: "resultado" },
        { src: "./../assets/images/resultado/nathan-dumlao-KixfBEdyp64-unsplash.jpg", alt: "Resultado del procesado del café", title: "Resultado del procesado del café.", group: "resultado" },
        { src: "./../assets/images/resultado/sergey-kotenev-UK6tuYeWq-E-unsplash.jpg", alt: "Resultado del procesado del café", title: "Resultado del procesado del café.", group: "resultado" },
        { src: "./../assets/images/resultado/sesha-reddy-kovvuri-NDGaRg2Mqtw-unsplash.jpg", alt: "Resultado del procesado del café", title: "Resultado del procesado del café.", group: "resultado" },
        { src: "./../assets/images/resultado/coffee-4973654_1280.jpg", alt: "Resultado del procesado del café", title: "Resultado del procesado del café.", group: "resultado" },
        { src: "./../assets/images/resultado/adriaan-venner-scheepers-kQJp5l6fW0-unsplash.jpg", alt: "Resultado del procesado del café", title: "Resultado del procesado del café.", group: "resultado" }
    ]
};

// 2. FUNCIÓN PARA GENERAR EL HTML DEL CARRUSEL
function generarCarrusel(idContenedorInner, imagenesArray) {
    const contenedor = document.getElementById(idContenedorInner);
    if (!contenedor) {
        console.error(`No se encontró el contenedor con ID: ${idContenedorInner}`);
        return;
    }

    let htmlCarrusel = '';

    imagenesArray.forEach((imagen, index) => {
        // La primera imagen debe tener la clase 'active'
        const activeClass = index === 0 ? 'active' : '';

        htmlCarrusel += `
            <div class="carousel-item ${activeClass}">
                <a href="${imagen.src}" data-lightbox="${imagen.group}" data-title="${imagen.title}" class="d-flex justify-content-center align-items-center">
                    <img src="${imagen.src}" class="d-block imagen-carrusel" alt="${imagen.alt}">
                </a>
                <div class="carousel-caption d-none d-md-block">
                    <p class="text-shadow-dark">${imagen.title}</p>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = htmlCarrusel;
}

// 3. LLAMAR A LA FUNCIÓN PARA CADA CARRUSEL
document.addEventListener('DOMContentLoaded', () => {
    // Generar el carrusel de Cultivo
    generarCarrusel('carousel-inner-cultivo', galeriaData.cultivo);

    // Generar el carrusel de Procesado
    generarCarrusel('carousel-inner-procesado', galeriaData.procesado);
    
    // Generar el carrusel de Resultado
    generarCarrusel('carousel-inner-resultado', galeriaData.resultado);

    // Nota: Lightbox debería funcionar automáticamente si ya está correctamente enlazado.
});