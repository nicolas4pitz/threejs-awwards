

import "./App.css";
import ThreeCanvas from "./components/ThreeCanvas";
import About from "./components/PageAbout";
import Home from "./components/PageHome";
import Contact from "./components/PageContact";

function App() {

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <ThreeCanvas />
          <Home />
          <About />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
