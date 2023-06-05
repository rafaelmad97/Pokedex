import { Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingPage/landingPage";
import HomePage from "./components/homePage/homePage";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={HomePage} />
          {/*<Route path="/detail/:id" component={ViewGame} />
          <Route path="/crear" component={Crearvideojuego} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
