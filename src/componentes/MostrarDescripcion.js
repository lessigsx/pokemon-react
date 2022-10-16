import React, { useState } from "react";
import { Fade, Button, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Descripcion from "./Descripcion";

// Descripcion del Pokemon
function MostrarDescripcion({
  datosPokemon,
  extraDatos,
  manejarDescripcion,
}) {
  const [fade, setFade] = useState(true);

  return (
    <Fade in={fade} timeout={500}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{
          zIndex: "2",
          position: useMediaQuery("(min-height: 600px)") ? "fixed" : "static",
          top: "50%",
          left: "50%",
          transform: useMediaQuery("(min-height: 600px)")
            ? "translate(-50%, -50%)"
            : null,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(145, 163, 92, 0.4)",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            sx={{
              zIndex: "2",
              marginBottom: "0.25em",
              padding: "0.75em",
              backgroundColor: "#bd5d3c",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "#8a402c",
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                manejarDescripcion(-1);
              }, 500);
            }}
          >
            Cerrar descripción
          </Button>
        </Grid>
        <Grid item>
          <Descripcion extraDatos={extraDatos} datosPokemon={datosPokemon} />
        </Grid>
      </Grid>
    </Fade>
  );
}

export default MostrarDescripcion;
