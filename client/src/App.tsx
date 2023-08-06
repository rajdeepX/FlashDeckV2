import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Deck from "./pages/Deck";
// import Note from "./pages/Note";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/notes/:noteId"} element={<Deck />}></Route>
      </Routes>
    </>
  );
}

export default App;
