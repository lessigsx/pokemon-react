import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import PokeCard from "./PokeCard";

function MostrarPokemon({
  listaPokemon,
  filtro,
  filtroSeleccion,
  manejarDescripcion,
}) {
  const [listaFiltrada, setLista] = useState([]);
  const [filtrar, setFiltrar] = useState(true);

  useEffect(() => {
    let nuevaLista = listaPokemon.filter((carta) =>
      carta.props.data.name.includes(filtro)
    );

    // Si de la busqueda no hay ningun pokemon disponible,
    // sugerirle al usuario de hacer una busqueda global
    !nuevaLista.length ? setFiltrar(false) : setFiltrar(true);

    setLista(nuevaLista);
  }, [listaPokemon, filtro, filtroSeleccion]);

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      {filtrar ? (
        listaFiltrada.map((carta, key) => {
          return (
            <Grid
              item
              key={key}
              sx={{
                width: 165,
                height: 280,
              }}
            >
              <Box
                onClick={() => {
                  manejarDescripcion(key);
                }}
              >
                {carta}
              </Box>
            </Grid>
          );
        })
      ) : (
        <Container
          sx={{
            p: 4,
            margin: "auto 0.5em",
          }}
        >
          <Typography gutterBottom variant="h6">
            No se encontró ningún Pokemón con ese nombre en la lista actual.
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            sx={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={async () => {
              const request = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?limit=1154"
              );
              const list = await request.data.results;
              const filteredUrls = list.filter((pokemon) =>
                pokemon.name.includes(filtro)
              );
              const listaPokemones = await axios.all(
                filteredUrls.map((lista) =>
                  axios.get(lista.url).then((response) => response.data)
                )
              );
              const listaCartas = listaPokemones.map((props) => {
                return <PokeCard data={props} key={props["id"]} />;
              });

              setLista(listaCartas);
              setFiltrar(true);
            }}
          >
            ¿Hacer búsqueda global?
          </Typography>
        </Container>
      )}
    </Grid>
  );
}

export default MostrarPokemon;
