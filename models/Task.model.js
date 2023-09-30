const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
  },
  {
    timestamps: true, 
  }
);

module.exports = model("Task", taskSchema);
