const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    task:{
        type:String,
        required:true,
    },
    check:{
        type:Number,
        required:true,
    }
    // date:{
    //     type:Date,
    //     default:Date.now
    // }
});

const taskModel = mongoose.model("taskbases",UserSchema)
module.exports = taskModel