import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export type TDeck = {
  title: string;
  notes: string[];
  _id: string;
};

const Home = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState<TDeck[]>([]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/notes", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const notes = await response.json();
    setNote([...note, notes]);
    setTitle("");
  };

  const handleDeleteNote = async (noteId: string) => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "DELETE",
    });
    setNote(note.filter((item) => item._id !== noteId));
  };

  const getNotes = async () => {
    const response = await fetch("http://localhost:5000/notes");
    const newNotes = await response.json();
    setNote(newNotes);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="App">
      <ul className="note">
        {note.map((item) => {
          return (
            <li key={item._id}>
              <button onClick={() => handleDeleteNote(item._id)}>X</button>
              <Link to={`/notes/${item._id}`}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleCreateNote}>
        <label htmlFor="note">Create Note</label>
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          required
        />

        <button>Create</button>
      </form>
    </div>
  );
};

export default Home;
