require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

const jogoRoutes = require("./routes/jogoRoutes")
const database = require("./database/jogoConfig")

app.use(express.json())
app.use(cors())

database.connect()

app.use("/api", jogoRoutes)

module.exports=app