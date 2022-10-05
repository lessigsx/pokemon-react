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
import { Link } from "react-router-dom";

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

  const pokemonName =
    data["name"].charAt(0).toUpperCase() + data["name"].slice(1);

  return (
    <Card className="pokemon">
      <CardActionArea component={Link} to={`/${data["id"]}`}>
        <CardMedia
          component="img"
          image={data["sprites"]["front_default"]}
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
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              letterSpacing: "0.3px",
              textAlign: "center",
            }}
          >
            {pokemonName}
          </Typography>
          <Grid container direction="row" justifyContent="space-evenly">
            {data["types"].map((type) => {
              let color = colores[type["type"]["name"]];
              let typeName =
                type["type"]["name"].charAt(0).toUpperCase() +
                type["type"]["name"].slice(1);
              return (
                <Grid item key={`${pokemonName}-${type["type"]["name"]}`}>
                  <Chip
                    label={typeName}
                    size="small"
                    variant="outlined"
                    sx={{
                      border: `2px solid ${color}`,
                      borderRadius: "4px",
                      margin: "0",
                      padding: "0",
                      backgroundColor: color,
                      color: "white",
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
