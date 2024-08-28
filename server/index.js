const express = require("express");
const Task = require("./Models");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const connectToDatabase = require("./db");
const moment = require("moment-timezone");

app.use(cors());
app.use(express.json());
const PORT = 3030;

connectToDatabase();
//DB

async function addTask(data) {
  try {
    const newTask = new Task(data);
    const savedTask = await newTask.save();
    console.log("Task added successfully:", savedTask);
    return savedTask;
  } catch (error) {
    console.error("Error adding Task:", error);
  }
}

async function getInfo() {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    console.error("Error retrieving tasks:", error);
  }
}

//

app.get("/", (req, res) => {
  res.status(200).json({
    test: "Welcome",
  });
});

//Add

app.post("/add", (req, res) => {
  const { task, due, importance } = req.body;
  addTask({
    task,
    due,
    importance,
    published: moment(new Date())
      .tz("America/Mexico_City")
      .format("YYYY-MM-DD HH:mm:ss"),
  });
  res.status(200).send("Ok");
});

app.get("/getinfo", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving tasks." });
  }
});

app.delete("/deleteone/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Eliminar el item
    const result = await Task.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item no encontrado" });
    }
    res.json({ message: "Item eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/edit/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message:   
 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log("Alive");
});
