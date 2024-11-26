const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const objects = require('./objects');
const multer = require('multer');




var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));



// multer code
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Store files in the 'uploads/' directory
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname); // Get the file extension
      const fileName = Date.now() + fileExtension;  // Create a unique file name
      cb(null, fileName + 'jpg');  // Save the file with the new unique name
    }
  });

// Set up multer to save uploaded files in the 'uploads/' folder
const upload = multer({
    dest: 'uploads/', // Temporary storage location
    fileFilter: (req, file, cb) => {
      // Check file type, for example, only allow images
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'), false);

        
      }
      cb(null, true);
    }
  });


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
app.post("/objects", upload.single('image'), async function(req, res) {
    const name = req.body.name;
    const comment = req.body.comment;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    // Get the file path for the uploaded image
    const imagePath = req.file ? '/uploads/' + req.file.filename : null;  // Save relative path in DB

    await objects.addObject(name, comment, latitude, longitude, imagePath );
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

