import React, { useState, useEffect } from "react";
import { Fade, Button, Grid } from "@mui/material";
import ExtraPokemon from "./ExtraPokemon";

// Descripcion del Pokemon
function AboutPokemon({ pokemonData, newStart }) {
  const [extraData, setExtraData] = useState([]);
  const [complete, setComplete] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const results = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonData["id"]}`
      );
      const data = await results.json();
      setExtraData(data);
    };

    getData().then(() => {
      setComplete(false);
    });
  }, [pokemonData, newStart]);

  return !complete ? (
    <Fade in={!complete} timeout={500}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{
          zIndex: "2",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            sx={{
              zIndex: "2",
              padding: "1em",
              backgroundColor: "#bd5d3c",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "#8a402c",
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              setComplete(true);
            }}
          >
            Cerrar descripcion
          </Button>
        </Grid>
        <Grid item>
          <ExtraPokemon extraData={extraData} pokemonData={pokemonData} />
        </Grid>
      </Grid>
    </Fade>
  ) : null;
}

export default AboutPokemon;
