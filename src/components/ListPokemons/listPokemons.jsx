import { useHistory } from "react-router-dom";
import CardDetail from "../cardDetail/cardDetail";
import "./listPokemons.css";
import { useState } from "react";

const ListPokemon = (props) => {
  const history = useHistory();
  const [pages, setPages] = useState(1);
  const [pagesdb, setPagesDb] = useState(1);
  const [byOrden, setbyOrden] = useState(1);
  const [byTipo, setByTipo] = useState(-1);
  const { types } = props;

  const [byOrigen, setbyOrigen] = useState("all");

  const handleSetPage = (value) => {
    setPages(value);
  };

  const handleSetPagedb = (value) => {
    setPagesDb(value);
  };

  const handleSlice = (isdb) => {
    const elements = isdb ? 4 : 4;
    const endindex = (isdb ? pagesdb : pages) * elements;
    let values = isdb
      ? props.pokemons_indatabase.sort((a, b) => handleSort(a, b, isdb))
      : props.pokemons.sort((a, b) => handleSort(a, b, isdb));

    if (values.length !== 0) {
      if (endindex - elements < 0) {
        values = values
          .slice(endindex)
          .filter((value) => filterbyTipo(isdb, value));
      } else {
        if (endindex === elements) {
          values = values
            .slice(0, endindex)
            .filter((value) => filterbyTipo(isdb, value));
        } else {
          values = values
            .slice(endindex - elements, endindex)
            .filter((value) => filterbyTipo(isdb, value));
        }
      }
    }
    return values;
  };

  const handleSort = (a, b, isdb) => {
    let a_name = isdb ? a.pokemon.Nombre : a.name;
    let b_name = isdb ? b.pokemon.Nombre : b.name;
    let a_rating = isdb
      ? a.pokemon.ataque
      : a.stats.filter(({ stat }) => stat.name === "attack")[0].base_stat;
    let b_rating = isdb
      ? b.pokemon.ataque
      : b.stats.filter(({ stat }) => stat.name === "attack")[0].base_stat;

    switch (byOrden) {
      case 1:
        return a_name > b_name ? 1 : -1;
      case 2:
        return b_name > a_name ? 1 : -1;
      case 3:
        return a_rating < b_rating ? 1 : -1;
      case 4:
        return b_rating < a_rating ? 1 : -1;
      default:
        return false;
    }
  };

  const handlesetbyOrigen = (event) => setbyOrigen(event.target.value);

  const handlesetbyOrden = (event) => setbyOrden(Number(event.target.value));

  const handlesetByTypo = (event) => setByTipo(Number(event.target.value));

  const filterbyTipo = (isDb, value) => {
    if (byTipo !== -1) {
      const type_name = types.find(({ id }) => id === byTipo)?.name;
      if (isDb) {
        return (
          value.type.find(({ id_types }) => id_types === byTipo) !== undefined
        );
      }

      return (
        value.types.find(({ type }) => type_name === type.name) !== undefined
      );
    }
    return true;
  };

  const handleCreate = () => {
    history.push("/AddPokemon");
  };

  return (
    <>
      <div className="container_options">
        <div className="item">
          <select
            placeholder="Origen"
            className="selecfilters"
            value={byOrigen}
            onChange={handlesetbyOrigen}
          >
            <option value="all">Origen</option>
            <option value="api">Api</option>
            <option value="bd">Base de datos</option>
          </select>
        </div>
        <div className="item">
          <select
            placeholder="Orden"
            className="selecfilters"
            value={byOrden}
            onChange={handlesetbyOrden}
          >
            <option value={1}>Ascendente</option>
            <option value={2}>Descendente</option>
            <option value={3}>Ataque (ASC)</option>
            <option value={4}>Ataque (DESC)</option>
          </select>
        </div>
        <div className="item">
          <select
            placeholder="Tipo"
            className="selecfilters"
            value={byTipo}
            onChange={handlesetByTypo}
          >
            <option value={-1}>Todos los tipos </option>
            {types.map((option) => (
              <option value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        <div className="item">
          <button className="AddPokemon" onClick={handleCreate}>
            Agregar Pokemon
          </button>
        </div>
      </div>

      {(byOrigen === "all" || byOrigen === "bd") && (
        <>
          <h1> Mis Pokemones</h1>
          <div className="Pokemons">
            {handleSlice(true).map(({ pokemon, type }) => {
              return (
                <CardDetail
                  pokemon={{ ...pokemon, types: type }}
                  key={pokemon.id}
                  isDbPokemon={true}
                />
              );
            })}
            {handleSlice(true).length === 0 && <h3> Nada por aqui</h3>}
          </div>
          <br />
          <br />
          <div className="pages">
            <div className="button_nav">
              {pagesdb !== 1 && (
                <button
                  onClick={() => handleSetPagedb(pagesdb - 1)}
                  className="button_nav back"
                ></button>
              )}
            </div>
            <div className="cuadro">
              <h3>{pagesdb}</h3>
            </div>
            <div className="button_nav">
              {handleSlice(true).length !== 0 && (
                <button
                  onClick={() => handleSetPagedb(pagesdb + 1)}
                  className="button_nav foward"
                ></button>
              )}
            </div>
          </div>
        </>
      )}
      <br />
      <br />
      {(byOrigen === "all" || byOrigen === "api") && (
        <>
          <h1> Pokedex Api</h1>
          <div className="Pokemons">
            {handleSlice(false).map((pokemon) => {
              return (
                <CardDetail
                  pokemon={pokemon}
                  key={pokemon.id}
                  isDbPokemon={false}
                />
              );
            })}
            {handleSlice(false).length === 0 && <h3> Nada por aqui</h3>}
          </div>
          <br />
          <br />
          <div className="pages">
            <div className="button_nav">
              {pages !== 1 && (
                <button
                  onClick={() => handleSetPage(pages - 1)}
                  className="button_nav back"
                ></button>
              )}
            </div>
            <div className="cuadro">
              <div className="cuadroInterno">
                <h3>{pages}</h3>
              </div>
            </div>
            <div className="button_nav">
              {handleSlice(false).length !== 0 && (
                <button
                  onClick={() => handleSetPage(pages + 1)}
                  className="button_nav foward"
                ></button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const mapStateToProps = ({ types }) => {
  return {
    types,
  };
};

export default ListPokemon;
