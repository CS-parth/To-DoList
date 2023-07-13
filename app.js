const express = require('express');

const bodyParser = require('body-parser');

var app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));

var items = [];
var value = "new task";
app.get("/",(req,res)=>{
    res.render('list',{list: items});
})

app.post("/",(req,res)=>{
    var item = req.body.task;
    items.push(item);
    res.redirect('/');
})


app.listen(4500,()=>{
    console.log("Server Started");
})