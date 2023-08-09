import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Deck from "./pages/Deck";
// import Header from "./components/Header";
// import Note from "./pages/Note";

export const BASE_URL = `http://localhost:5000`;
// export const BASE_URL = `https://note-deck-backend.onrender.com`;

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
