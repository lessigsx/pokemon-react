import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutPokemon from "./AboutPokemon";
import CartaPokemon from "./CartaPokemon";
import FetchPokemon from "./FetchPokemon";

// global, por ahora
var pokemonAboutData;

function Pokemon(pokemon) {
  // URL, ver cual pokemon es clickeado
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pokemonClicked = location.pathname.substring(1);
    if (pokemonClicked !== "/" && !(pokemonClicked === "")) {
      FetchPokemon(pokemonClicked)
        .then((data) => (pokemonAboutData = data))
        .then(setVisible(true));
    }
  }, [location]);

  return (
    <div className="contenedor">
      <CartaPokemon pokemonDatos={pokemon} />

      {
        // Cuando visible se vuelva true, deberia mostrar el AboutPokemon
      }
      {visible ? <AboutPokemon pokemonData={pokemonAboutData} /> : ""}
    </div>
  );
}

export default Pokemon;
