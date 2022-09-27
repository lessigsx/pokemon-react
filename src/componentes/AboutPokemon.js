import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

// Descripcion del Pokemon 
function AboutPokemon(pokemonData) {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: "#dddddd",
        textAlign: "center",
      }}
    >
      <Typography gutterBottom variant="h6" component="div">
        {
            // Todavia no funciona
        }
        {pokemonData}
      </Typography>
    </Box>
  );
}

export default AboutPokemon;
