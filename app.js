const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://0.0.0.0:27017/surf")
const userRoutes = require("./routes/userRoutes")

const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))
db.once("open", () => {
  console.log("Database connected")
})
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))
app.use("/api/user", userRoutes)
app.get("/", (req, res, next) => {
  res.send("app started")
})
app.listen(`${process.env.PORT}`, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
