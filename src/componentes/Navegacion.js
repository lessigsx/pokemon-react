import React from "react";
import {
  InputLabel,
  FormControl,
  Select,
  useMediaQuery,
  Grid,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import { Search, ArrowLeft, ArrowRight } from "@material-ui/icons";

function Navegacion({ manejarPaginacion, setFiltro }) {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Paper
          sx={{
            p: "2px 4px",
            margin: "1em",
            backgroundColor: "#bec88c",
            display: "inline-block",
            fontSize: "1.4em",
            cursor: "pointer",
          }}
          onClick={() => manejarPaginacion("", "back")}
        >
          <IconButton type="button" sx={{ p: "10px" }}>
            <ArrowLeft />
          </IconButton>
        </Paper>
      </Grid>
      <Grid
        item
        container={useMediaQuery("(min-width: 500px)") ? false : true}
        justifyContent="center"
        alignItems="center"
        sx={{
          order: useMediaQuery("(min-width: 500px)") ? "0" : "-1",
        }}
      >
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
              setFiltro(filtroBusqueda.target.value.toLowerCase().trim());
            }}
            inputProps={{ "aria-label": "busca un pokemon" }}
          />
          <IconButton type="button" sx={{ p: "10px" }}>
            <Search />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item>
        <Paper
          sx={{
            p: "2px 4px",
            margin: "1em",
            backgroundColor: "#bec88c",
            display: "inline-block",
            fontSize: "1.4em",
            cursor: "pointer",
          }}
          onClick={() => manejarPaginacion("", "next")}
        >
          <IconButton type="button" sx={{ p: "10px" }}>
            <ArrowRight />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item container alignItems="center" justifyContent="center">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-native-select">Filtrar por</InputLabel>
          <Select
            native
            defaultValue=""
            id="grouped-native-select"
            label="Filtrar por"
            onChange={(valor) => manejarPaginacion(valor.target.value)}
          >
            <option value={"https://pokeapi.co/api/v2/pokemon/?limit=25"}>
              Sin filtros
            </option>
            <optgroup label="Generación">
              <option value={"https://pokeapi.co/api/v2/generation/1/"}>
                Gen. I
              </option>
              <option value={"https://pokeapi.co/api/v2/generation/2/"}>
                Gen. II
              </option>
              <option value={"https://pokeapi.co/api/v2/generation/3/"}>
                Gen. III
              </option>
              <option value={"https://pokeapi.co/api/v2/generation/4/"}>
                Gen. IV
              </option>
              <option value={"https://pokeapi.co/api/v2/generation/5/"}>
                Gen. V
              </option>
              <option value={"https://pokeapi.co/api/v2/generation/6/"}>
                Gen. VI
              </option>
              <option value={"https://pokeapi.co/api/v2/generation/7/"}>
                Gen. VII
              </option>
              <option value={"https://pokeapi.co/api/v2/generation/8/"}>
                Gen. VIII
              </option>
            </optgroup>
            <optgroup label="Tipo">
              <option value={"https://pokeapi.co/api/v2/type/1"}>Normal</option>
              <option value={"https://pokeapi.co/api/v2/type/2"}>Lucha</option>
              <option value={"https://pokeapi.co/api/v2/type/3"}>
                Volador
              </option>
              <option value={"https://pokeapi.co/api/v2/type/4"}>Veneno</option>
              <option value={"https://pokeapi.co/api/v2/type/5"}>Tierra</option>
              <option value={"https://pokeapi.co/api/v2/type/6"}>Roca</option>
              <option value={"https://pokeapi.co/api/v2/type/7"}>Bicho</option>
              <option value={"https://pokeapi.co/api/v2/type/8"}>
                Fantasma
              </option>
              <option value={"https://pokeapi.co/api/v2/type/9"}>Acero</option>
              <option value={"https://pokeapi.co/api/v2/type/10"}>Fuego</option>
              <option value={"https://pokeapi.co/api/v2/type/11"}>Agua</option>
              <option value={"https://pokeapi.co/api/v2/type/12"}>
                Tierra
              </option>
              <option value={"https://pokeapi.co/api/v2/type/13"}>
                Electrico
              </option>
              <option value={"https://pokeapi.co/api/v2/type/14"}>
                Psiquico
              </option>
              <option value={"https://pokeapi.co/api/v2/type/15"}>Hielo</option>
              <option value={"https://pokeapi.co/api/v2/type/16"}>
                Dragon
              </option>
              <option value={"https://pokeapi.co/api/v2/type/17"}>
                Oscuro
              </option>
              <option value={"https://pokeapi.co/api/v2/type/18"}>Hada</option>
            </optgroup>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Navegacion;
