import { HashRouter as Router, Route} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
   <Router basename="/">
     <Home />
   </Router>
  );
}

export default App;
