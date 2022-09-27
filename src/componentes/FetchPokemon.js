// Fetch pokemon individualmente
function PokeFetch(pokemonNombre) {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNombre}`).then(
    (res) => res.json()
  );
}

export default PokeFetch;
