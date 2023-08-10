import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";
import CardSkeleton from "../CardSkeleton";

export type TDeck = {
  title: string;
  notes: string[];
  _id: string;
};

const Home = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState<TDeck[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/notes`, {
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
    await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
    setNote(note.filter((item) => item._id !== noteId));
  };

  const getNotes = async () => {
    const response = await fetch(`${BASE_URL}/notes`);
    const newNotes = await response.json();
    setNote(newNotes);
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <header>
        <h1>
          NoteDeck<span>V2</span>
        </h1>
        <p>
          A simple step towards keeping your notes <span>organized</span>.
        </p>
      </header>
      <div className="App">
        <form onSubmit={handleCreateNote}>
          <label htmlFor="note">Create Deck</label>
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

        <ul className="note">
          {loading && <CardSkeleton />}

          {note.map((item) => {
            return (
              <li key={item._id}>
                <button onClick={() => handleDeleteNote(item._id)}>X</button>
                <Link to={`/notes/${item._id}`}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
