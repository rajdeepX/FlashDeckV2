import { Request, Response } from "express";
import NotesModel from "../src/models/Note";

export async function createCardForDeckController(req: Request, res: Response) {
  const noteId = req.params.noteId;
  const note = await NotesModel.findById(noteId);

  const { text } = req.body;
  if (!note) return res.status(400).send("no note exist");
  note.notes.push(text);
  await note.save();
  res.json(note);
}
