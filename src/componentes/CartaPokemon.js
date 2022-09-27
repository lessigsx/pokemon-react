import React from "react";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

function CartaPokemon(pokemonDatos) {
  return (
    <div className="contenedor">
      {pokemonDatos["pokemonDatos"].map((poke, id) => (
        <Card className="pokemon contenedor" key={id}>
          <CardActionArea component={Link} to={`/${poke.name}`}>
            <CardMedia
              component="img"
              image={poke.sprites.front_default}
              alt={`Sprite de ${poke.name}`}
              className={poke.types[0].type.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {poke.name}
              </Typography>
              <Chip
                label={poke.types[0].type.name}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default CartaPokemon;
