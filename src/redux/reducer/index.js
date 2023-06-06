/* 4️⃣ ***REDUCER*** 4️⃣ */

/* Importa las action-types aquí. */
import * as actions from "../actions/index";

const initialState = {
  types: [],
  pokemons: [],
  pokemons_indatabase: [],
  searched_pokemons: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_TYPES:
      return { ...state, types: action.payload };
    case actions.GET_POKEMONS:
      return { ...state, pokemons: action.payload };
    case actions.GET_POKEMONS_INDATABASE:
      return { ...state, pokemons_indatabase: action.payload };
    case actions.GET_POKEMONS_BY_NAME:
      return { ...state, searched_pokemons: action.payload };
    case actions.CLEAN_RESULTS:
      return { ...state, searched_pokemons: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
