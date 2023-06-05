import { Component } from "react";
import * as actions from "../../redux/actions/index";
import { connect } from "react-redux";

import "./homepage.css";


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
          {JSON.stringify(this.props.pokemons)}
          {/* <SearchVideogame /> */}
          {/* <ListVideogames
            videogames={this.props.videogames}
            db_videogames={this.props.databases_videogames}
            genres={this.props.genres}
          /> */}
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
