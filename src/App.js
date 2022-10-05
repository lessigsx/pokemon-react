import React, { useEffect, useState } from "react";
import PokeMenu from "./componentes/PokeMenu";
import "./App.css";

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [complete, setComplete] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (complete) {
      const results = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=25"
      );
      const data = await results.json();
      const newData = await data.results;
      setAllPokemon(newData);
      setComplete(false);
      }
    };

    // Para que no se ejecute de nuevo al actualizar un archivo en desarrollo
    if (complete) {
      getData();
    }

  }, [complete]);

  return (
    <div className="App">
      {!complete ? <PokeMenu pokemonesUrl={allPokemon} /> : "Cargando..."}
    </div>
  );
}

export default App;
