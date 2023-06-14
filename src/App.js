import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import HomePage from "./components/homePage/homePage";
import ViewPokemon from "./components/viewPokemon/ViewPokemon";

import "./App.css";
import AddPokemon from "./components/AddPokemon/AddPokemon";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/detail/:id" component={ViewPokemon} />
          <Route path="/AddPokemon" component={AddPokemon} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
