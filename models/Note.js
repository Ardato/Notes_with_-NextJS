const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
      trim: true,
      maxlength: [40, "Title cannot be more then 40 Characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [200, "Description cannot be more 200 Characters"],
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
