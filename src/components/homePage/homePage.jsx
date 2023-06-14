import { Component } from "react";
import * as actions from "../../redux/actions/index";
import { connect } from "react-redux";

import "./homepage.css";
import SearchPokemon from "../searchVideogame/searchPokemon";
import ListPokemon from "../ListPokemons/listPokemons";

class HomePage extends Component {
  componentDidMount() {
    this.props.getTypes();
    this.props.getPokemons();
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <div className="content homepage">
          <SearchPokemon />
          <ListPokemon
            pokemons={this.props.pokemons}
            pokemons_indatabase={this.props.pokemons_indatabase}
            types={this.props.types}
          />
        </div>
        <div className="background_home" />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    getTypes: () => {
      return dispatch(actions.getTypes());
    },
    getPokemons: () => {
      return dispatch(actions.getPokemons());
    },
    searchPokemonbyName: (name) => {
      return dispatch(actions.searchPokemonbyName(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
