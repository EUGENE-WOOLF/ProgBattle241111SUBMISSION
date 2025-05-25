const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const { Player, Team } = require('./loginAndPlayer/modelsAndDatabases/databaseInit');
const multer  = require('multer')
const rungame = require('./rungame')
const getResultFromCSV = require('./winner'); 
const cors = require('cors');

app.use(cors())


//setting up ejs for seding dynamic response
app.set('views' , 'ejs')
app.set('views', path.join(__dirname, 'views'));


//multer is used here for file upload most of it given in the documentaition 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ProgBattle/uploads/');
  },
  filename: function (req, file, cb) {
    const originalExt = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, originalExt);
    const safeName = baseName.replace(/[^a-zA-Z0-9_-]/g, ''); // sanitize filename
    cb(null, safeName + originalExt);
  }
});

const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect('mongodb+srv://eugenewoolf220205:kooaC97J1UjrWTSk@cluster0.neq5rqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("Connection error:", err));



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


app.get("/progbattle/round2", async (req, res) => {

  try {
    const allTeamData = await Team.find({})
    
  } catch (error) {
    console.log(error)
  }
  
  res.sendFile(path.join(__dirname, 'public', 'round2', 'index.html'))
  
})


app.get("/progbattle/leaderBoard/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaderBoard', 'index.html'))
})

app.get("/progbattle/submitCode/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'submitCode', 'index.html'))
})
//


app.get("/progbattle/teams", async (req, res) => {
  try {
    const allTeams = [];
    const allPlayers = await Player.find({});

    const teamSize = 4;
    const numTeams = 16;             
    const roster = allPlayers.slice(0, teamSize * numTeams); 

    for (let i = 0; i < numTeams; i++) {
      const start = i * teamSize;
      const squad = roster.slice(start, start + teamSize);

      allTeams.push({
        teamName: `Team ${i + 1}`,  
        members: squad
      });
    }
    
    await Team.deleteMany({})
    await Team.insertMany(allTeams)
    res.sendFile(path.join(__dirname, 'public', 'team', 'index.html'))
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});



app.get("/progbattle/teams/teaminfo" ,async (req, res) => {

  try {
    const allTeamData = await Team.find({})
    // console.log(allTeamData)
    res.json(allTeamData);
  } catch (error) {
    console.log(error)
  }
})

// VERY UNCOVENTIAL SOLUTION THE CODE TAKES TIME TO RUN AND WE NEED TO RETURN A PROMISE 


app.post("/progbattle/round1",  upload.single('botFile'), async (req, res) => {
  //here the round 1 begins
  try {
    await rungame()
    const result = getResultFromCSV(path.join(__dirname, 'ProgBattle', 'game_log.csv'));
    const {scoreBot1:playerScore, scoreBot2:botScore ,winner } = result;
    console.log(playerScore, winner);
    console.log("Game Result:", result);
    res.render('codecompleted.ejs', {playerScore, botScore ,winner})
    //please wait a few second 3 to be exact and
  } catch (error) {
    console.log("THRE WAS AN ERROR")
  }
  
})



app.post('/progbattle/login', async (req, res) => {
  //login saves the files in mongodb atlas
  console.log("it is reaching here")
  console.log(req.body)
  
  const {username : uname , userEmail : umail, password : upassword} = req.body
  let p1 = new Player({
    username : uname,
    userEmail : umail,
    password : upassword 
  })

  await p1.save()
  res.redirect('/progbattle/dashboard')
  //adding the palyer to database
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


































  
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
