import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TDeck } from "./Home";
import { BASE_URL } from "../App";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../CardSkeleton";
// import { Link } from "react-router-dom";
// import { TDeck } from "./Home";

const Deck: React.FC = () => {
  const { noteId } = useParams();

  const [text, setText] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [noteDeck, setNoteDeck] = useState<TDeck>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    const note = await fetch(`${BASE_URL}/notes/${noteId}/note`, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const createdNote = await note.json();

    setNoteDeck(createdNote);
    setText("");
  };

  const handleDeleteNote = async (index: number) => {
    if (!noteId) return;
    const newNotes = await fetch(`${BASE_URL}/notes/${noteId}/note/${index}`, {
      method: "DELETE",
    });

    const deletedNote = await newNotes.json();

    setNotes(deletedNote.notes);
  };

  const getNotes = async (noteId: string) => {
    const res = await fetch(`${BASE_URL}/notes`);
    const response = await fetch(`${BASE_URL}/notes/${noteId}`);
    const newNotes = await response.json();
    const ress = await res.json();
    const data = ress.find((item: { _id: string }) => {
      return item._id === noteId;
    });
    const title = data.title;
    setTitle(title);
    setLoading(false);

    setNotes(newNotes.notes);
  };

  useEffect(() => {
    if (!noteId) return;
    getNotes(noteId);
  }, [noteDeck, noteId]);
  return (
    <>
      <header>
        <h2>{loading ? <Skeleton className="skeleton-title" /> : title}</h2>
      </header>
      <div className="App">
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

        <ul className="note">
          {loading && <CardSkeleton />}
          {notes.map((item, index) => {
            return (
              <li key={index}>
                <button onClick={() => handleDeleteNote(index)}>X</button>

                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Deck;
