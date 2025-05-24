const { mongo, default: mongoose } = require("mongoose")
const playerInfo = require("./playerInfo")
const teamInfo = require("./teamInfo")

const Player = mongoose.model("Player", playerInfo)
const Team = mongoose.model("Team", teamInfo)

module.exports = { Player, Team };
