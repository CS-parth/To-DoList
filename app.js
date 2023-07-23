const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

app.set("view engine","ejs");

app.use(express.static('res'));
app.use(express.urlencoded({extended: true}));


mongoose.connect("mongodb://127.0.0.1:27017/Todo");

const trySchema = new mongoose.Schema({
    name: String
})

var items = mongoose.model("Tasks",trySchema); // ans items array having elemet name task and each element having Schema 
// Tasks is a collection which can be accssed thorugh items

app.get("/",async (req,res)=>{
    const data = await items.find();
    res.render('list',{list: data});
})

app.post("/",(req,res)=>{
    var item = req.body.task;
    var task = new items({
        name: req.body.task
    });
    task.save();
    res.redirect('/');
})

app.post("/delete",async (req,res)=>{
    const id = req.body.btn;
    const result = await items.findByIdAndDelete(id);
    console.log(result)
    res.redirect("/");
})

app.listen(4500,()=>{
    console.log("Server Started");
})