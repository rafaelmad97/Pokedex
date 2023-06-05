import { useHistory } from "react-router-dom";
import "./landingComponent.css";

const LandingContent = () => {
  const history = useHistory();

  const handleHome = () => {
    history.push("/home");
  };

  return (
    <div className="content landingPage">
      <h1>Henry Pokemon</h1>
      <h1>Bienvenidos</h1>
      <br />
      <br />
      <button className="button" onClick={handleHome} />
    </div>
  );
};

export default LandingContent;
