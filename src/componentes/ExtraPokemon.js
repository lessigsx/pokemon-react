import React, { useEffect, useState } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { Box, Grid, Container } from "@mui/material";
import Image from "mui-image";

function ExtraPokemon({ pokemonData, extraData }) {
  const [pokemonDescripcion, setDescripcion] = useState("");
  const [pokemonName, setPokemonName] = useState("");

  const responsiveWidth = useMediaQuery("(min-width: 892px)")
    ? { marginLeft: "25%", width: "50%" }
    : null;
  const defaults = {
    backgroundColor: "#e8e7b3",
    textAlign: "center",
    color: "black",
    marginTop: "0.5em",
    marginBottom: "1em",
    borderRadius: "1em",
  };
  const styles = { ...defaults, ...responsiveWidth };

  useEffect(() => {
    setDescripcion(
      extraData["flavor_text_entries"].find(
        (description) => description["language"]["name"] === "es"
      )
    );
    setPokemonName(
      extraData["name"].charAt(0).toUpperCase() + extraData["name"].slice(1)
    );

  }, [pokemonData, extraData]);

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        width={useMediaQuery("(min-width: 892px)") ? "50%" : null}
        sx={styles}
      >
        <Box
          sx={{
            padding: "8px",
            marginTop: "1em",
            marginBottom: "0.5em",
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {pokemonName}
          </Typography>
          <Image
            src={pokemonData["sprites"]["front_default"]}
            fit="cover"
            duration={1000}
            easing="ease-in-out"
            alt={`Imagen de ${pokemonName}`}
          />
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
            }}
          >
            {`ID: ${pokemonData["id"]}`}
          </Typography>
        </Box>
        <Box>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              textAlign: "justify",
              margin: "10px auto",
              padding: "20px",
            }}
          >
            {pokemonDescripcion["flavor_text"]}
          </Typography>
        </Box>
        <Grid
          container
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ p: 2 }}
          direction={useMediaQuery("min-width: 500px") ? "row" : "column"}
        >
          {extraData["evolves_from_species"] !== null ? (
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Evoluciona de
              </Typography>
              <Typography variant="body1">
                {extraData["evolves_from_species"]["name"]
                  .charAt(0)
                  .toUpperCase() +
                  extraData["evolves_from_species"]["name"].slice(1)}
              </Typography>
            </Grid>
          ) : null}
          <Box>
            <Typography variant="h6" gutterBottom>
              Generación
            </Typography>
            <Typography variant="body1">
              {
                // La variable de la generacion da "generacion-{numero}", entonces esta
                // linea larga le quita el "generacion-", agarra solo el numero y lo coloca en mayuscula
                extraData["generation"]["name"]
                  .substring(extraData["generation"]["name"].indexOf("-") + 1)
                  .toUpperCase()
              }
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Altura
            </Typography>
            <Typography variant="body1">
              {`${pokemonData["height"] / 10}m`}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Peso
            </Typography>
            <Typography variant="body1">
              {`${pokemonData["weight"] / 10}kg`}
            </Typography>
          </Box>
        </Grid>
        <Grid>
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
              {pokemonData["abilities"].map((ability, id) => {
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

export default ExtraPokemon;
