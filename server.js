/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Parin Pandya Student ID: 117818211 Date: 12/10/22
*
*  Online (Cyclic) Link: https://dead-pink-wombat-cape.cyclic.app/
*
********************************************************************************/ 


const express = require("express");
const path = require("path");
const data = require("./data-service.js");
const multer = require("multer");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
  }
  
  // multer requires a few options to be setup to store files with file extensions
  // by default it won't store extensions for security reasons
  const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb)  
    {
      // we write the filename as the current date down to the millisecond
      // in a large web service this would possibly cause a problem if two people
      // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
      // this is a simple example.
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // tell multer to use the diskStorage function for naming files instead of the default.
  const upload = multer({ storage: storage });

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res) => 
{
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req,res) => 
{
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/students/add", (req,res) => 
{
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

app.get("/images/add", (req,res) => 
{
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), (req,res) => 
{
    res.redirect("/images");
});

app.get("/images", (req,res) => 
{
    fs.readdir("./public/images/uploaded", function(err,items) 
    {
        res.json(items);
    })
});

app.post('/student/add', (req,res) =>
 {
    data.addStudent(studentdata).then(() => 
    {
        res.redirect("/student");
        
    })
});

app.get("/students", (req,res) => {
    data.getAllStudents().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/intlstudents", (req,res) => {
    data.getInternationalStudents().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/programs", (req,res) => {
    data.getPrograms().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.send(err);
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});

