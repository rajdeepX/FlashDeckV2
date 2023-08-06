import React, { useState } from "react";
// import { createCard } from "../api/createCard";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { TDeck } from "./Home";

const Deck = () => {
  const { noteId } = useParams();
  console.log(noteId);

  const [text, setText] = useState("");
  //   const [note, setNote] = useState<TDeck[]>([]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/notes/${noteId}/note`, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setText("");
  };

  //   const handleDeleteNote = async (noteId: string) => {
  //     await fetch(`http://localhost:5000/notes/${noteId}`, {
  //       method: "DELETE",
  //     });
  //     setNote(note.filter((item) => item._id !== noteId));
  //   };

  //   const getNotes = async () => {
  //     const response = await fetch("http://localhost:5000/notes");
  //     const newNotes = await response.json();
  //     setNote(newNotes);
  //   };

  //   useEffect(() => {
  //     getNotes();
  //   }, []);
  return (
    <div className="App">
      {/* <ul className="note">
        {note.map((item) => {
          return (
            <li key={item._id}>
              <button onClick={() => handleDeleteNote(item._id)}>X</button>
              <Link to={`/notes/${item._id}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul> */}
      <form onSubmit={handleCreateNote}>
        <label htmlFor="note">Create Note</label>
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          required
        />

        <button>Create</button>
      </form>
    </div>
  );
};

export default Deck;
