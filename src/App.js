import './App.css';
import { Home } from './components/home/Home';
import rnmImage from "./assets/rnm-bg.png";

function App() {
  return (
    <div className="App">
      <img className="rnmImage" src={rnmImage} alt="rick-and-morty-logo"/>
      <Home />
    </div>
  );
}

export default App;
