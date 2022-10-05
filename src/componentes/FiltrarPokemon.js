import React, { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";

function FiltrarPokemon({ datosPokemon, filtro }) {
  const [nuevaLista, setNuevaLista] = useState([]);

  useEffect(() => {
    const listaArreglada = datosPokemon.sort((a, b) => a.key - b.key);
    setNuevaLista(
      listaArreglada.filter((carta) => carta.props.data.name.includes(filtro))
    );
  }, [datosPokemon, filtro]);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      alignItems="center"
      justifyContent="center"
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {nuevaLista.map((carta, id) => {
        return (
          <Grid item key={id}>
            {carta}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default FiltrarPokemon;
