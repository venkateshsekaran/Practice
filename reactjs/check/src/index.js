import reactdom from "react-dom";
import App from "./Doit";
import Getit from "./Getit";
reactdom.render(<App />, document.getElementById("check"));
reactdom.render(<Getit />, document.getElementById("check1"));
