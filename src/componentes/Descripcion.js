import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { Box, Grid, Container, Chip } from "@mui/material";
import Image from "mui-image";

function Descripcion({ datosPokemon, extraDatos }) {
  const [pokemonDescripcion, setDescripcion] = useState("");
  const [pokemonNombre, setPokemonNombre] = useState("");
  const numbPattern = /\/[0-9]+/g;

  useEffect(() => {
    setDescripcion(
      extraDatos["flavor_text_entries"].find(
        (description) => description["language"]["name"] === "es"
      )
    );
    setPokemonNombre(
      extraDatos["name"].charAt(0).toUpperCase() + extraDatos["name"].slice(1)
    );
  }, [datosPokemon, extraDatos]);

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        width={useMediaQuery("(min-width: 900px)") ? "50%" : null}
        sx={{
          backgroundColor: "#e8e7b3",
          textAlign: "center",
          color: "black",
          marginTop: "0.2em",
          marginBottom: "1em",
          marginLeft: useMediaQuery("(min-width: 900px)") ? "25%" : null,
          borderRadius: "1em",
        }}
      >
        <Grid item>
          <Image
            src={datosPokemon["sprites"]["front_default"]}
            fit="cover"
            duration={1000}
            easing="ease-in-out"
            alt={`Imagen de ${pokemonNombre}`}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
            }}
          >
            {`${pokemonNombre}`}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ margin: "8px 0" }}
        >
          <Chip
            label={`Gen ${extraDatos["generation"]["name"]
              .substring(extraDatos["generation"]["name"].indexOf("-") + 1)
              .toUpperCase()}`}
          />
          <Chip label={`${datosPokemon["weight"] / 10}kg`} />
          <Chip label={`${datosPokemon["height"] / 10}m`} />
        </Grid>

        <Grid item>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              textAlign: "center",
              padding: "8px",
            }}
          >
            {pokemonDescripcion["flavor_text"]}
          </Typography>
        </Grid>

        {extraDatos["evolves_from_species"] !== null ? (
          <Grid
            container
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ padding: "8px 5px" }}
          >
            <Grid item>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                Evoluciona de
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                {extraDatos["evolves_from_species"]["name"]
                  .charAt(0)
                  .toUpperCase() +
                  extraDatos["evolves_from_species"]["name"].slice(1)}
              </Typography>
            </Grid>
            <Grid item>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${extraDatos[
                  "evolves_from_species"
                ]["url"].match(numbPattern)}.png`}
                fit="cover"
                duration={1000}
                easing="ease-in-out"
                alt={`Imagen de ${
                  extraDatos["evolves_from_species"]["name"]
                    .charAt(0)
                    .toUpperCase() +
                  extraDatos["evolves_from_species"]["name"].slice(1)
                }`}
              />
            </Grid>
          </Grid>
        ) : null}

        <Grid item>
          <Box>
            <Typography variant="h6" gutterBottom>
              Habilidades
            </Typography>
            <Box
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                marginBottom: "1em",
              }}
            >
              {datosPokemon["abilities"].map((ability, id) => {
                const abilityName =
                  ability["ability"]["name"].charAt(0).toUpperCase() +
                  ability["ability"]["name"].slice(1);
                return (
                  <Grid
                    item
                    justifyContent="center"
                    alignItems="center"
                    key={id}
                    sx={{
                      display: "flex",
                      marginTop: "0.5em",
                      marginBottom: "0.5em",
                      textAlign: "center",
                    }}
                  >
                    <Typography gutterBottom variant="subtitle2">
                      {abilityName}{" "}
                      {ability["is_hidden"] ? "(habilidad oculta)" : null}
                    </Typography>
                  </Grid>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Descripcion;
