import React from "react";
import { Routes, Route } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Menu from "./components/Menu.jsx";
import Index from "./components/Index.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2" element={<Problem2 />} />
          <Route path="problem-2/:content" element={<Problem2 />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;

