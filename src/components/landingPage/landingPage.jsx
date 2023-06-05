import { Component } from "react";
import "./landingPage.css";
import LandingContent from "../landingContent/landingComponent";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <LandingContent />
        <div className="background_leading" />
      </div>
    );
  }
}

export default LandingPage;
