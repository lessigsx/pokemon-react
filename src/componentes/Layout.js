import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import PokeCard from "./PokeCard";
import MostrarPokemon from "./MostrarPokemon";
import Navegacion from "./Navegacion";
import MostrarDescripcion from "./MostrarDescripcion";
import Loading from "./Loading";

function Layout() {
  const [pokemonDatos, setDatos] = useState([]);
  const [descripcionDatos, setDescripcion] = useState([]);
  const [complete, setComplete] = useState(false);

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=25");
  const [actualPag, setActualPag] = useState([0, 25]);

  const [filtroBusqueda, setFiltro] = useState("");
  const [tipoFetch, setFetchTipo] = useState("normal");
  const [verDescripcion, setVerDescripcion] = useState(-1);

  const manejarPaginacion = async (newUrl, direction) => {
    if (direction === "back") {
      if (tipoFetch === "normal") {
        setActualPag([actualPag[0], actualPag[1] - 25]);
      } else {
        setActualPag([actualPag[0] - 25, actualPag[0]]);
      }
    } else if (direction === "next") {
      if (tipoFetch === "normal") {
        setActualPag([actualPag[0], actualPag[1] + 25]);
      } else {
        setActualPag([actualPag[1], actualPag[1] + 25]);
      }
    }

    if (newUrl) {
      if (newUrl.includes("generation") && tipoFetch !== "generation") {
        setFetchTipo("generation");
      } else if (newUrl.includes("type") && tipoFetch !== "type") {
        setFetchTipo("type");
      } else if (newUrl.includes("limit") && tipoFetch !== "normal") {
        setFetchTipo("normal");
      }
      setActualPag([0, 25]);
      setUrl(newUrl);
    } else if (tipoFetch === "normal") {
      if (actualPag[1] + 25 > 1154) {
        setUrl("https://pokeapi.co/api/v2/pokemon/?limit=25&offset=1129");
        setActualPag([actualPag[0], 1129]);
      } else if (actualPag[1] - 25 < -26) {
        setUrl("https://pokeapi.co/api/v2/pokemon/?limit=25");
        setActualPag([actualPag[0], 0]);
      } else {
        const request = await axios.get(url);
        setUrl(
          direction === "next" ? request.data.next : request.data.previous
        );
      }
    }
  };

  const manejarDescripcion = (id) => {
    setVerDescripcion(id);
  };

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        let request;
        let response;
        let pokemonUrls;

        let datosPokemon;
        let datosExtra;

        let listaCartas;

        setComplete(false);
        request = await axios.get(url);

        switch (tipoFetch) {
          case "normal":
            response = await request.data.results;
            break;
          case "generation":
            response = await request.data.pokemon_species;
            break;
          case "type":
            response = await request.data.pokemon;
            break;
          default:
          // nada
        }

        if (tipoFetch !== "normal") {
          if (actualPag[0] + 25 > response.length) {
            setActualPag([response.length - 25, response.length]);
            alert("Alcanzaste el final de la lista");
          } else if (actualPag[1] - 25 < -1) {
            setActualPag([0, 25]);
            alert("Estás en el inicio de la lista");
          }
        }

        if (tipoFetch === "normal") {
          pokemonUrls = await axios.all(
            response.map((list) => axios.get(list.url))
          );
          pokemonUrls = await axios.all(
            response.map((list) => axios.get(list.url))
          );
          datosPokemon = pokemonUrls.map((data) => {
            return data.data;
          });
          datosExtra = await axios.all(
            datosPokemon.map((pokemon) =>
              axios
                .get(
                  `https://pokeapi.co/api/v2/pokemon-species/${pokemon["id"]}`
                )
                .then((response) => response.data)
            )
          );

          listaCartas = datosPokemon.map((props) => {
            return <PokeCard data={props} key={props["id"]} />;
          });
        } else if (tipoFetch === "generation") {
          pokemonUrls = await axios.all(
            response
              .slice(actualPag[0], actualPag[1])
              .map((list) => axios.get(list.url))
          );
          datosExtra = pokemonUrls.map((data) => {
            return data.data;
          });
          datosPokemon = await axios.all(
            datosExtra.map((data) => axios.get(data.varieties[0].pokemon.url))
          );

          listaCartas = datosPokemon.map((props) => {
            return <PokeCard data={props.data} key={props.data.id} />;
          });
        } else if (tipoFetch === "type") {
          datosPokemon = await axios.all(
            response
              .slice(actualPag[0], actualPag[1])
              .map((list) => axios.get(list.pokemon.url))
          );
          datosExtra = await axios.all(
            datosPokemon.map((pokemon) =>
              axios
                .get(pokemon.data.species.url)
                .then((response) => response.data)
            )
          );

          listaCartas = datosPokemon.map((props) => {
            return <PokeCard data={props.data} key={props.data.id} />;
          });
        }

        setDatos(listaCartas);
        setDescripcion(datosExtra);
        setComplete(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDatos();
  }, [url, actualPag, tipoFetch]);

  return (
    <Box>
      <Navegacion
        manejarPaginacion={manejarPaginacion}
        setFiltro={setFiltro}
        setComplete={setComplete}
        setFetchTipo={setFetchTipo}
      />
      {verDescripcion !== -1 ? (
        <MostrarDescripcion
          listaPokemon={pokemonDatos}
          datosPokemon={pokemonDatos[verDescripcion]["props"]["data"]}
          extraDatos={descripcionDatos[verDescripcion]}
          manejarDescripcion={manejarDescripcion}
        />
      ) : null}
      {complete ? (
        <MostrarPokemon
          listaPokemon={pokemonDatos}
          filtro={filtroBusqueda}
          manejarDescripcion={manejarDescripcion}
        />
      ) : (
        <Loading />
      )}
    </Box>
  );
}

export default Layout;
