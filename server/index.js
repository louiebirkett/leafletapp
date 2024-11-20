var express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const objects = require('./objects');



var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// GET ALL
app.get("/objects", async function(req, res) {
    const allObjects = await objects.getObjects();
    res.send(allObjects);
});

// GET OBJECT
app.get("/objects/:id", async function(req, res) {
    const object = await objects.getObjectById(req.params.id);
    res.send(object);
});


// POST OBJECT
app.post("/objects", async function(req, res) {
    const name = req.body.name;
    const comment = req.body.comment;
    await objects.addObject(name, comment);
    res.send({"message": "Success"});
});

// PUT OBJECT
app.put("/objects/:id", async function (req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const comment = req.body.comment;
    await objects.editObject(id,name,comment);
    res.send({"message": "Success"});
});



// DELETE OBJECT
app.delete("/objects/:id", async function(req, res){
    await objects.deleteObject(req.params.id);
    res.send({"message": "Success"});
});

app.listen(process.env.PORT || 8080,function(req,res){
    console.log("Server Started!");
});

