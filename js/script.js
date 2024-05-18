// Obtiene el contenedor donde se mostrarán las tarjetas de Pokémon
const poke_container = document.getElementById('poke-container');

// Obtiene todos los botones del header
const botonesHeader = document.querySelectorAll(".btn-header");

// Define la cantidad de Pokémon a obtener
const pokemon_count = 150 // Puedes ajustar este número según tus necesidades

// Define un objeto con los colores asociados a cada tipo de Pokémon
const colors = {
    steel: '#B7B7CE',
    water: '#DEF3FD',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    electric: '#FCF7DE',
    ghost: '#735797',
    fire: '#FDDFDF',
    fairy: '#fceaff',
    ice: '#96D9D6',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    grass: '#DEFDE0',
    psychic: '#eaeda1',
    rock: '#d5d5d4',
    sinister: '#705746',
    ground: '#f4e7da',
    poison: '#98d7a5',
    flying: '#F5F5F5'
};

// Obtiene un arreglo con los tipos de Pokémon definidos en el objeto colors
const main_types = Object.keys(colors);

// Función asíncrona que obtiene los datos de los Pokémon
const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i); // Espera a que se obtengan los datos de cada Pokémon
    }
};

// Función asíncrona que obtiene los datos de un Pokémon específico por su ID
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`; // URL de la API para obtener los datos del Pokémon
    const res = await fetch(url); // Realiza una petición a la URL
    const data = await res.json(); // Convierte la respuesta en un objeto JSON
    createPokemonCard(data); // Crea una tarjeta para el Pokémon con los datos obtenidos
};

// Función que crea una tarjeta HTML para mostrar la información de un Pokémon
const createPokemonCard = (pokemon) => {
    const card = document.createElement('div'); // Crea un div para la tarjeta
    card.classList.add('pokemon'); // Añade la clase 'pokemon' al div

    const primaryType = pokemon.types[0].type.name; // Obtiene el tipo principal del Pokémon
    card.style.backgroundColor = colors[primaryType]; // Asigna un color de fondo según el tipo de Pokémon

    const spriteContainer = document.createElement('div'); // Crea un contenedor para la imagen del Pokémon
    spriteContainer.classList.add('img-container'); // Añade la clase 'img-container' al contenedor

    const sprite = document.createElement('img'); // Crea un elemento de imagen
    sprite.src = pokemon.sprites.front_default; // Asigna la URL de la imagen del Pokémon
    sprite.alt = pokemon.name; // Asigna el nombre del Pokémon como texto alternativo
    spriteContainer.appendChild(sprite); // Añade la imagen al contenedor

    const info = document.createElement('div'); // Crea un contenedor para la información del Pokémon
    info.classList.add('info'); // Añade la clase 'info' al contenedor

    const number = document.createElement('span'); // Crea un elemento de tipo span para el número del Pokémon
    number.classList.add('number'); // Añade la clase 'number' al span
    number.textContent = `${pokemon.id.toString().padStart(3, '0')}`; // Asigna el ID del Pokémon con tres dígitos de longitud
    info.appendChild(number); // Añade el span al contenedor de información

    const name = document.createElement('h3'); // Crea un elemento de tipo h3 para el nombre del Pokémon
    name.classList.add('name'); // Añade la clase 'name' al h3
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Asigna el nombre del Pokémon con la primera letra en mayúscula
    info.appendChild(name); // Añade el h3 al contenedor de información

    const type = document.createElement('small'); // Crea un elemento de tipo small para el tipo de Pokémon
    type.classList.add('type'); // Añade la clase 'type' al small
    type.textContent = `Type: ${primaryType}`; // Asigna el tipo del Pokémon
    info.appendChild(type); // Añade el small al contenedor de información

    card.appendChild(spriteContainer); // Añade el contenedor de la imagen a la tarjeta
    card.appendChild(info); // Añade el contenedor de información a la tarjeta

    poke_container.appendChild(card); // Añade la tarjeta al contenedor principal
};

// Función que muestra un Pokémon en el contenedor
const mostrarPokemon = (pokemon) => {
    createPokemonCard(pokemon); // Llama a la función para crear la tarjeta del Pokémon
};

// Añade eventos a cada botón para filtrar por tipo de Pokémon
botonesHeader.forEach(boton => boton.addEventListener("click", async (event) => {
    const botonId = event.currentTarget.id;

    // Limpia el contenedor antes de mostrar los Pokémon filtrados
    poke_container.innerHTML = "";

    // Obtiene y muestra los Pokémon según el tipo seleccionado
    for (let i = 1; i <= pokemon_count; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const res = await fetch(url);
        const data = await res.json();

        if (botonId === "ver-todos") {
            mostrarPokemon(data);
        } else {
            const tipos = data.types.map(type => type.type.name);
            if (tipos.includes(botonId)) {
                mostrarPokemon(data);
            }
        }
    }
}));

// Llama a la función para obtener los datos de los Pokémon y crear las tarjetas
fetchPokemons();