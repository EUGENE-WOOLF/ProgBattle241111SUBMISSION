const { mongo, default: mongoose } = require("mongoose")
const playerInfo = require("./playerInfo")
const teamInfo = require("./teamInfo")


mongoose.connect('mongodb+srv://eugenewoolf220205:kooaC97J1UjrWTSk@cluster0.neq5rqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("The fake data has been added"))
.catch((err) => console.error("Connection error:", err));


const Player = mongoose.model("Player", playerInfo)
const Team = mongoose.model("Team", teamInfo)

//some fake data has been added for the players to begin and they will be used for teams

module.exports = { Player, Team };
