const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const { Player, Team } = require('./loginAndPlayer/modelsAndDatabases/databaseInit');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//multer is used here for file upload


// MongoDB Connection
mongoose.connect('mongodb+srv://eugenewoolf220205:kooaC97J1UjrWTSk@cluster0.neq5rqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Connection error:", err));

//this servers the static files in the directory app.css her
// Serve login page assets at /progbattle/login/*
//middleware part
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   '/progbattle/login',
//   express.static(path.join(__dirname, 'loginAndPlayer', 'loginPage'))
// );

// // Serve dashboard assets at /progbattle/dashboard/*
// app.use(
//   '/progbattle/dashboard',
//   express.static(path.join(__dirname, 'dashboard'))
// );


app.use(
  '/progbattle',
  express.static(path.join(__dirname, 'public'))
);

app.use(express.urlencoded({extended : true})); // it runs for all of the whenever a request is sent
app.use(express.json())



// Routes for the html pages
app.get("/progbattle/login", (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'loginPage', 'index.html'));
});

app.get('/progbattle/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname,'public' ,'Dashboard', 'index.html'))
})

app.get("/progbattle/round1", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'round1', 'index.html'))
})


app.get("/progbattle/round2", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'round2', 'index.html'))
})


app.get("/progbattle/leaderBoard/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaderBoard', 'index.html'))
})

app.get("/progbattle/submitCode/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'submitCode', 'index.html'))
})

app.get("/progbattle/team/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'team', 'index.html'))
})

app.post("/progbattle/round1",  upload.single('botFile'), (req, res) => {
  res.send("Find uploaded successfully")
})

app.post('/progbattle/login', (req, res) => {

    console.log("it is reaching here")
    console.log(req.body)
    res.redirect('/progbattle/dashboard')
    //adding the palyer to database
})


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
