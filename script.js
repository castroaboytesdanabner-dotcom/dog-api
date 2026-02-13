// CONSTANTES
const API_URL = 'https://dog.ceo/api/breeds/image/random/10';
const btnLoad = document.getElementById('btn-load');
const appContainer = document.getElementById('app');

// FUNCIÓN PRINCIPAL (ASÍNCRONA)
async function fetchDogs() {
    try {
        // 1. Feedback visual para el usuario
        btnLoad.textContent = 'Cargando perritos...';
        btnLoad.disabled = true;
        appContainer.style.opacity = '0.5'; // Efecto visual de "recargando"

        // 2. Petición al servidor (Fetch)
        const response = await fetch(API_URL);

        // 3. Manejo de errores HTTP
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        // 4. Convertir respuesta a JSON
        const data = await response.json();

        // 5. Renderizar
        renderGallery(data.message);

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al cargar las imágenes. Revisa tu conexión.');
    } finally {
        // 6. Restaurar estado inicial
        btnLoad.textContent = 'Cargar Perros';
        btnLoad.disabled = false;
        appContainer.style.opacity = '1';
    }
}

// FUNCIÓN DE RENDERIZADO (DOM)
function renderGallery(images) {
    // Limpiar contenedor anterior
    appContainer.innerHTML = '';

    images.forEach(imageUrl => {
        // Crear tarjeta
        const card = document.createElement('div');
        card.className = 'dog-card';

        // Crear imagen
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Perro aleatorio';
        img.loading = 'lazy'; // Carga diferida para ahorrar datos en celular

        // Ensamblar
        card.appendChild(img);
        appContainer.appendChild(card);
    });
}

// ESCUCHADOR DE EVENTOS
// Buena práctica: Esperar a que el HTML cargue completamente (aunque poner el script al final ayuda)
document.addEventListener('DOMContentLoaded', () => {
    btnLoad.addEventListener('click', fetchDogs);
});