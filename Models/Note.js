const mongoose = require("mongoose");
const { create } = require("./User");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  files: {
    type: [
      {
        fileId: mongoose.Schema.Types.ObjectId,
        fileName: String,
        fileType: String,
      },
    ],
    default: [], // Initialize as empty array
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const NoteModel = mongoose.model("notes", NoteSchema);
module.exports = NoteModel;
