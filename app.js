// Get Node Modules
const path = require("path");

// Get NPM modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");




// Build Connection to Mongo db
const connectionString = "mongodb+srv://Team7:1234@cluster0.glhvt.mongodb.net/TM-T7?retryWrites=true&w=majority";
mongoose.connect(connectionString);

// App modules
const Task = require("./model/task");
// Create the express http server
const app = express();

// Define Static and Middleware
app.use(express.static("./Client"));

app.use(bodyParser.json());


app.get("/api",async (req,res)=>{
    const tasks = await Task.find();
    res.send(tasks);

})
app.post("/api", async (req,res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.send();
  })

  app.delete("/api/:id",async (req,res)=>{
    const showId = (req.params.id);
    await Task.deleteOne({_id: showId});
    res.send();
  })

  app.put("/api/:id",async (req,res)=>{
    const showId = (req.params.id);

    const updateTask = await Task.findOne({_id: showId});

    if (updateTask.completed === false){
        updateTask.completed = true;
    }else{
        updateTask.completed = false;
    }
    updateTask.save();
    res.send();
  })

  
  app.patch("/api/:id",async (req,res)=>{
    const showId = req.params.id;
    const temp = req.body.name;
    const editTask = await Task.findOne({_id: showId});
    editTask.name = temp;
    await editTask.save();
    res.send();
  })
// Page not found route
app.all("*",(req,res)=>{
    res.status(404).send("<h1>Page Not Found....</h1>");
})


const appName = "My List";
const port = 5000;
app.listen(port,()=>{
    console.log(`App ${appName} is running on port ${port}`);
})
