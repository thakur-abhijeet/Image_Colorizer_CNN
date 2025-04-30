import { useState } from "react";
import "./App.css";
import axios from "axios";
import HeroSection from "./components/HeroSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <HeroSection />
      </div>
    </div>
  );
}

export default App;
