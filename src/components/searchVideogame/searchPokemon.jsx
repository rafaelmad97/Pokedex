import {  useState } from "react";
import CardDetail from "../cardDetail/cardDetail";
import * as actions from "../../redux/actions/index";

import { connect } from "react-redux";

import "./searchPokemon.css";

const SearchPokemon = (props) => {
  const { searchPokemonbyName, searched_pokemons,cleanResults  } = props;

  const [search, setSearch] = useState("");
  const [showResults, setshowResults] = useState(false)

  const handleSetSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClean = () => {
    setshowResults(false)
    setSearch("");
    cleanResults()
  };

  const handleSearch = () => {
    searchPokemonbyName(search);
    setshowResults(true)
  }

  return (
    <>
     <div className="content_search">
        <input
          type="text"
          onChange={handleSetSearch}
          value={search}
          placeholder="Buscar Pokemon"
          className="search search_shadow"
        />
        <br />
        <button className="cleanSearch" onClick={(event) => handleSearch()}>
          Buscar Pokemon
        </button>
        <button className="cleanSearch" onClick={(event) => handleClean()}>
          Limpiar Resultados
        </button>
      </div>
      
      <br />
       {showResults && <>

       {searched_pokemons.db !== undefined && (
            <>
              <h3>Mis Juegos</h3>
              <div className="results">
                 {searched_pokemons.db?.map(({pokemon,pokemonTypes}) => {
                  return (
                    <CardDetail
                      pokemon={{
                        ...pokemon,
                        types: pokemonTypes,
                      }}
                      key={pokemon.id}
                      isDbPokemon={true}
                    />
                  );
                })} 
                {searched_pokemons.db?.length === 0 && (
                  <h1>No hay resultados</h1>
                )}
              </div>
            </>
          )}
          <br />
          {searched_pokemons.api !== undefined && (
            <>
              <h3> Fuente externa</h3>
              <br />
              <div className="results">
                {searched_pokemons.api?.length === 0 ?(
                  <h1>No hay resultados</h1>
                  ): <>
                  {searched_pokemons.api?.map((pokemon) => {
                   return <CardDetail
                   pokemon={
                    pokemon
                   }
                   key={pokemon.id}
                   isDbPokemon={false}
                 />
                 })} 
                
                </>}
              </div>
            </>
          )} 
       </>

           
        }

      <br /> 
    </>
  );
};

export const mapStateToProps = ({ searched_pokemons, types }) => {
  return {
    searched_pokemons,
    types,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    searchPokemonbyName: (name) => {
      return dispatch(actions.searchPokemonbyName(name));
    },
    cleanResults: ()=>{
      return dispatch(actions.cleanResults());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPokemon);
