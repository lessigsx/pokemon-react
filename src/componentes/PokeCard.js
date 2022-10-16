import React from "react";
import {
  Chip,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
} from "@mui/material";
import Typography from "@mui/material/Typography";

function PokeCard({ data }) {
  const colores = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  const tipos = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Luchador",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Oscuro",
    steel: "Acero",
    fairy: "Hada",
  };

  const pokemonName =
    data["name"].charAt(0).toUpperCase() + data["name"].slice(1);

  return (
    <Card
      sx={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#a8a77a",
        transition: "all .2s ease-in-out",
        "&:hover": {
          boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
          transform: "scale(1.04)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data["id"]}.png`}
          alt={`Sprite de ${pokemonName}`}
          sx={{
            backgroundColor: "#e7f2c4",
          }}
        />
        <CardContent
          sx={{
            backgroundColor: "#e4e8b3",
          }}
        >
          <Grid container direction="row" justifyContent="space-evenly">
            <Grid item container alignItems="center" justifyContent="center">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontSize: pokemonName.includes("-mega") ? "14px" : "16px",
                  letterSpacing: "0.3px",
                  textAlign: "center",
                }}
              >
                {pokemonName}
              </Typography>
            </Grid>
            {data["types"].map((type) => {
              let color = colores[type["type"]["name"]];
              let typeName =
                tipos[type["type"]["name"]].charAt(0).toUpperCase() +
                tipos[type["type"]["name"]].slice(1);
              return (
                <Grid item key={`${pokemonName}-${type["type"]["name"]}`}>
                  <Chip
                    label={typeName}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.90em",
                      border: `2px solid ${color}`,
                      borderRadius: "4px",
                      backgroundColor: color,
                      color: "#fffafa",
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokeCard;
