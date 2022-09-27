import React, { useEffect, useState } from "react";
import Pokemon from "./componentes/Pokemon";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const pokemonList = [];
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=25")
      .then((response) => response.json())
      .then((data) =>
        data.results.map((item) =>
          fetch(item.url)
            .then((response) => response.json())
            .then((poke) => pokemonList.push(poke))
            .then(setPokemon(pokemonList))
        )
      );
  }, []);

  // La unica forma que se me ocurre esperar a que termine la API de cargar los pokemones
  setTimeout(() => {
    setComplete(true);
  }, 1000);

  return (
    <div className="App">
      <div className="contenedor">
        {complete ? Pokemon(pokemon) : <p>...</p>}
      </div>
    </div>
  );
}

export default App;
