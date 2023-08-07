import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TDeck } from "./Home";
// import { Link } from "react-router-dom";
// import { TDeck } from "./Home";

const Deck: React.FC = () => {
  const { noteId } = useParams();

  console.log(noteId);

  const [text, setText] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [noteDeck, setNoteDeck] = useState<TDeck>();

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    const note = await fetch(`http://localhost:5000/notes/${noteId}/note`, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const createdNote = await note.json();
    console.log(createdNote);

    setNoteDeck(createdNote);
    setText("");
  };

  const handleDeleteNote = async (index: number) => {
    if (!noteId) return;
    const newNotes = await fetch(
      `http://localhost:5000/notes/${noteId}/note/${index}`,
      {
        method: "DELETE",
      }
    );

    const deletedNote = await newNotes.json();
    console.log(deletedNote);

    console.log(deletedNote.notes);

    console.log(deletedNote.notes[index]);
    setNotes(deletedNote.notes);
    console.log(index);
  };

  const getNotes = async (noteId: string) => {
    const response = await fetch(`http://localhost:5000/notes/${noteId}`);
    const newNotes = await response.json();

    setNotes(newNotes.notes);
  };

  useEffect(() => {
    if (!noteId) return;
    getNotes(noteId);
  }, [noteDeck, noteId]);
  return (
    <div className="App">
      <ul className="note">
        {notes.map((item, index) => {
          return (
            <li key={index}>
              <button onClick={() => handleDeleteNote(index)}>X</button>

              {item}
            </li>
          );
        })}
      </ul>
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
