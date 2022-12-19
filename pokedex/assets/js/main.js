// requisição HTTP via js utilizando o Fetch API
const pokemonListId = document.getElementById('pokemonListId')
const btnLoadMore = document.getElementById('btnLoadMore')

const maxRecords = 151
const limit = 10
let offset = 0


function convertPokemonToHtml(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">

                </div>
            </li>`
}

function loadMorePokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHTML = pokemonList.map(convertPokemonToHtml).join('') // retornando a lista de novos pokemons
        pokemonListId.innerHTML += newHTML   
    })
}

loadMorePokemonItems(offset, limit)

btnLoadMore.addEventListener('click', () => {
    offset += limit
    const records = offset + limit

    if (records >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadMorePokemonItems(offset, newLimit)

        btnLoadMore.parentElement.removeChild(btnLoadMore)
    }else {
        loadMorePokemonItems(offset, limit)
    }
})


// promise<response> : promessa do objeto response
// => arrow function para economiza código com uma sintaxe mais reduzida


