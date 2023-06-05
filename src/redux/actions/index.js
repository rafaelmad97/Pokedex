const API_URL = process.env.REACT_APP_API_URL;

export const GET_TYPES = "GET_TYPES";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_INDATABASE = "GET_POKEMONS_INDATABASE";
export const GET_POKEMONS_BY_NAME = "GET_POKEMONS_BY_NAME";

export const getTypes = () => {
  return async function (dispatch) {
    await fetch(`${API_URL}/types`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: GET_TYPES,
          payload: res.types,
        })
      )
      .finally();
  };
};

export const getPokemons = () => {
  return async function (dispatch) {
    await fetch(`${API_URL}/pokemons`)
      .then((res) => res.json())
      .then(({ api, database }) => {
        dispatch({
          type: GET_POKEMONS,
          payload: api,
        });
        return database;
      })
      .then((database) => {
        dispatch({
          type: GET_POKEMONS_INDATABASE,
          payload: database,
        });
      })
      .finally();
  };
};

export const searchPokemonbyName = (name) => {
  return async function (dispatch) {
    await fetch(`${API_URL}/pokemons?name=${name}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: GET_POKEMONS_BY_NAME,
          payload: res,
        });
      })
      .finally();
  };
};

export const getPokemonbyID = async (id) => {
  return await fetch(`${API_URL}/pokemons/${id}`)
    .then((res) => res.json())
    .finally();
};

export const createPokemon = async (formdata) => {
  console.log(formdata);
};
