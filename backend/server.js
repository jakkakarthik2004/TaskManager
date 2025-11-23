const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");

let tasksCollection;

MongoClient.connect("mongodb+srv://jsunnybabu_db_user:jk12345@cluster0.befmjyu.mongodb.net/")
.then(client => {
    console.log('Connected to Database')
    const db = client.db('task-manager')
    tasksCollection = db.collection('tasksCollection')

    app.set('tasksCollection', tasksCollection)
})
.catch(error => {
    console.error(error)    
})

const app = express();
app.use(cors());
app.use(express.json());

app.post("/addTasks", async (req, res) => {
  const taskData = {
    taskname: req.body.taskname,
    taskdate: req.body.taskdate,
    createdAt: new Date()
  };

  const result = await tasksCollection.insertOne(taskData);

  res.status(201).send({
    message: "Task inserted",
    data: { ...taskData, _id: result.insertedId }
  });
});


app.get("/getTasks", async (req, res) => {
    const tasks = await tasksCollection.find().toArray();
    res.send(tasks);
  });


app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.get("/status", (req, res) => {
  res.send("working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
