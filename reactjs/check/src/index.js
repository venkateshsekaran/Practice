import reactdom from "react-dom";
import Nav from "./navbar/Nav";
import Body from "./navbar/Body";

reactdom.render(<Nav />, document.getElementById("check"));
reactdom.render(<Body />, document.getElementById("check1"));
