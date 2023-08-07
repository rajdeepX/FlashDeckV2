import express, { Request, Response } from "express";
import mongoose from "mongoose";
require("dotenv").config();
import cors from "cors";
import NotesModel from "./models/Note";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/notes", async (req: Request, res: Response) => {
  console.log(req.body);

  const newNote = new NotesModel({
    title: req.body.title,
  });
  const createdNote = await newNote.save();
  res.json(createdNote);
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await NotesModel.find();
  res.json(notes);
});

app.delete("/notes/:noteId", async (req: Request, res: Response) => {
  const noteID = req.params.noteId;
  console.log(noteID);

  const response = await NotesModel.findByIdAndDelete(noteID);
  console.log(response);

  res.json(response);
});

app.post("/notes/:noteId/note", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await NotesModel.findById(noteId);

  const { text } = req.body;
  if (!note) return res.status(400).send("no note exist");
  note.notes.push(text);
  await note.save();
  console.log(note);

  res.json(note);
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  // console.log(noteId);

  const response = await NotesModel.findById(noteId);
  res.json(response);
});

app.delete(
  "/notes/:noteId/note/:index",
  async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const index = req.params.index;

    const note = await NotesModel.findById(noteId);
    if (!note) return res.status(400).send("Note does not exists!");
    note.notes.splice(parseInt(index), 1);
    await note.save();
    res.json(note);
    console.log(note.notes[parseInt(index)], [parseInt(index)]);
  }
);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(5000, () => {
    console.log("server started at port: 5000");
  });
});
