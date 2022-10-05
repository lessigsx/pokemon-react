import React, { useEffect, useState } from "react";
import { Typography, IconButton, Paper, InputBase, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Search } from "@material-ui/icons";
import { Box } from "@mui/system";
import PokeCard from "./PokeCard";
import AboutPokemon from "./AboutPokemon";
import FiltrarPokemon from "./FiltrarPokemon";
import { Link } from "react-router-dom";

function PokeMenu({ pokemonesUrl }) {
  const [listaPokemon, setListaPokemon] = useState([]);
  const [filtroBusqueda, setFiltro] = useState("");
  const [complete, setComplete] = useState(true);

  const [verDescripcion, toggleDescripcion] = useState(true);
  const location = useLocation();
  const actualLocation = location.pathname.substring(1) - 1;

  useEffect(() => {
    const getData = () => {
      let datosPokemon = [];
      let iterations = 0;

      pokemonesUrl.map(async ({ url }) => {
        const response = await fetch(url);
        const json = await response.json();
        datosPokemon = [...datosPokemon, json];

        iterations++;
        if (iterations === pokemonesUrl.length) {
          setListaPokemon(
            datosPokemon.map((props) => {
              return <PokeCard data={props} key={props["id"]} />;
            })
          );
          setComplete(false);

          if (
            location.pathname.substring(1) !== "" &&
            actualLocation < pokemonesUrl.length
          ) {
            toggleDescripcion(false);
          }
        }
      });
    };
    getData();
  }, [pokemonesUrl, location.pathname, actualLocation]);

  if (actualLocation > pokemonesUrl.length) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: "transparent",
          color: "black",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <Grid item>
          <Typography gutterBottom variant="h2">
            :(
          </Typography>
          <Typography gutterBottom variant="h4">
            El índice de Pokemon que colocaste está fuera de la lista disponible
            de 25 pokemones.
          </Typography>
          <Typography component={Link} to="/" gutterBottom variant="h3">
            Volver al inicio
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box>
      {!complete ? (
        <Grid container alignItems="center" justifyContent="center">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              marginTop: "1em",
              marginBottom: "1em",
              backgroundColor: "#bec88c",
              display: "inline-block",
            }}
          >
            <InputBase
              sx={{
                padding: "6px",
                ml: 1,
                flex: 1,
              }}
              placeholder="Busca un Pokemón"
              onInput={(filtroBusqueda) => {
                setFiltro(filtroBusqueda.target.value.toLowerCase());
              }}
              inputProps={{ "aria-label": "busca un pokemon" }}
            />
            <IconButton type="button" sx={{ p: "10px" }}>
              <Search />
            </IconButton>
          </Paper>
        </Grid>
      ) : null}

      {!verDescripcion ? (
        <AboutPokemon
          pokemonData={listaPokemon[actualLocation]["props"]["data"]}
          newStart={Math.random()}
        />
      ) : null}

      {!complete ? (
        <FiltrarPokemon datosPokemon={listaPokemon} filtro={filtroBusqueda} />
      ) : null}
    </Box>
  );
}

export default PokeMenu;
