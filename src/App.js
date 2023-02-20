import React from "react";
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from "./home";
import NotFound from "./notFound";
import SingleMovie from "./singleMovie";


function App() {

  return (
   <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/movies/:id" element={<SingleMovie />} />
      </Routes>

    </Router>
  );
}

export default App;
