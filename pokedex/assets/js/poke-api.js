// funções de manipulação da API

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) { // convertendo o modelo da API para meu modelo
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) // convertendo a resposta da lista dos detalhes dos pokemons para json
        .then(convertPokeApiDetailToPokemon)
} 

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` // chamando a url e utilizando as variáveis como valor

    return fetch(url) // executando a url da lista de pokemons
        .then((response) => response.json()) // convertendo o response para json
        .then((jsonBody) => jsonBody.results) // apenas os resultados do json 
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeando a lista em uma lista de requisições dos detalhes dos pokemons
        .then((detailRequests) => Promise.all(detailRequests)) // esperando que todas (all) as requisições terminem
        .then((pokemonsDetails) => pokemonsDetails)
}
