const express = require("express");
const app = express();
const mongoose = require('mongoose');

const taskModel = require('./models/Task')

const cors = require('cors') 

app.use(express.json()); //we have to do this since any request which requires a body
                         //won't be executed if this statement is not present.

app.use(cors());
require("dotenv").config();

mongoose.connect("mongodb+srv://tododatabase:todoDatabase@cluster0.lft38.mongodb.net/todoapp?retryWrites=true&w=majority")
{
    useNewUrlParser:true
}
//todoDatabase

app.get("/getTask",(req,res)=>{
    taskModel.find({}, (err,result)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

app.post("/createTask",async (req,res) => {
    const task = req.body;
    const newTask = new taskModel(task);
    await newTask.save();

    res.json(task);
})

app.delete("/deleteTask/:id",async (req,res) => {
    const id =req.params.id
    await taskModel.findByIdAndDelete(id).exec();
    res.send("deleted")
})

app.put("/updateTask",async (req,res) => {
    const newcheck = req.body.check;
    const id = req.body.id;

    try{
        await taskModel.findById(id,(err, updatedtask)=>{
            updatedtask.check = newcheck;
            updatedtask.save();
            res.send("updatede")
        });
    }
    catch(err){
        console.log(err);
    }
});


app.listen( process.env.PORT || 3001,()=>{
    console.log("SERVER RUNS PERFECTLY");
})