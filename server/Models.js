const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  due: { type: Date, required: true },
  importance: { type: String, required: true },
  published: { type: Date, required: true },
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
