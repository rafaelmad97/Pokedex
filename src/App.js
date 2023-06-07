import { Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingPage/landingPage";
import HomePage from "./components/homePage/homePage";
import ViewPokemon from "./components/viewPokemon/ViewPokemon";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/detail/:id" component={ViewPokemon} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
