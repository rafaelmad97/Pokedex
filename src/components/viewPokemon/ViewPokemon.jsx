import "./viewPokemon.css";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { getPokemonbyID } from "../../redux/actions";
import { connect } from "react-redux";

const ViewPokemon = (props) => {
  const { getPokemonbyID, types } = props;
  const [result, setResults] = useState({});
  const params = useParams();
  const { state } = useLocation();
  const history = useHistory();

  if (state === undefined) {
    history.push("/home");
  }

  useEffect(() => {
    getPokemonbyID(params.id)
      .then((res) => (state.isdb ? res.db : res.api))
      .then((res) =>
        setResults({
          id: state.isdb ? res[0].pokemon.ID : res.id,
          name: state.isdb ? res[0].pokemon.Nombre : res.name,

          background_image: state.isdb
            ? res[0].pokemon.Imagen
            : res.sprites.front_default,
          Vida: state.isdb
            ? res[0].pokemon.Vida
            : res.stats.find(({ stat }) => stat.name === "hp")?.base_stat,
          Ataque: state.isdb
            ? res[0].pokemon.Ataque
            : res.stats.find(({ stat }) => stat.name === "attack")?.base_stat,
          Defensa: state.isdb
            ? res[0].pokemon.Defensa
            : res.stats.find(({ stat }) => stat.name === "defense")?.base_stat,
          Velocidad: state.isdb
            ? res[0].pokemon.Velocidad
            : res.stats.find(({ stat }) => stat.name === "speed")?.base_stat,
          Altura: state.isdb ? res[0].pokemon.Altura : res.height,
          Peso: state.isdb ? res[0].pokemon.Peso : res.weight,
          type: state.isdb ? res[0].type : res.types,
        })
      );
  }, [getPokemonbyID, params.id, state.isdb]);

  const Types = state.isdb
    ? result.type?.map(({ id_types }) => {
        return types.find(({ id }) => id === id_types)?.name;
      })
    : result.type?.map(({ type }) => type.name);

  const handleHome = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="data_pokemon">
        <h1>
          {result?.id} - {result?.name}
        </h1>

        <br />
        <div>
          <p>Vida: {result?.Vida}</p>
          <p>Ataque: {result?.Ataque}</p>
          <p>Defensa: {result?.Defensa}</p>
          <p>Velocidad: {result?.Velocidad}</p>
          <p>Altura: {result?.Altura} mts</p>
          <p>Peso: {result?.Peso} kg</p>
        </div>
        <br />
        <ul className="list types">
          {Types?.map((type) => (
            <li>{type}</li>
          ))}
        </ul>
        <br />
        <div>
          <button className="go_home_button" onClick={handleHome} />
        </div>
        <br />
      </div>
      <img
        src={result?.background_image}
        className="imagen_pokemon"
        alt={result?.name}
      />
    </>
  );
};

export const mapStateToProps = ({ types }) => {
  return {
    types,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    getPokemonbyID: (name) => {
      return getPokemonbyID(name);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPokemon);
