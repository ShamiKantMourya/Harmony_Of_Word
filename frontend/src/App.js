import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
    </Router>
  );
}

export default App;
