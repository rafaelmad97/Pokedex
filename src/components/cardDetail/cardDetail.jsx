import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./cardDetail.css";

const CardDetail = (props) => {
  const { isDbPokemon, pokemon, types } = props;
   const history = useHistory();

  const typesValues = isDbPokemon
     ? pokemon.types
    .map((value) => {
          const indexType = types.findIndex((typedb) => typedb.id === value.id_types);
        return indexType !== -1 ? types[indexType].name : "";
     })
            :  pokemon.types.map(({type}) => type?.name)

  
  const handleNav = () => {
     history.push(`/detail/${isDbPokemon ? pokemon.ID: pokemon.id}`, {
      isdb: isDbPokemon,
     });
  };

  return (
    <div className="card" onClick={handleNav}>
      <div className="card_container">
        <img
          src={isDbPokemon ? pokemon.Imagen : pokemon.sprites.front_shiny}
          className="pokemon_image"
          alt={isDbPokemon ? pokemon.Nombre : pokemon.name}
        /> 
        <p>{isDbPokemon ? pokemon.Nombre : pokemon.name}</p>
         <div className="view_types">
          {types !== undefined && (
            <>
              {typesValues.map((value) => {
                return <p className="text_types">{value}</p>;
              })}
            </>
          )}
        </div> 
      </div>
    </div>
  );
};

export const mapStateToProps = ({ types }) => {
  return {
     types,
  };
};

export default connect(mapStateToProps, undefined)(CardDetail);
