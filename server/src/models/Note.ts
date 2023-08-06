import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const NotesSchema = new Schema({
  title: String,
  notes: [String],
});

const NotesModel = mongoose.model("Notes", NotesSchema);

export default NotesModel;
