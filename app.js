const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")

mongoose.set("strictQuery", false)
const mongodbUrl = process.env.MONGO_DB_URL
//local url= "mongodb://0.0.0.0:27017/surf"
mongoose.connect(mongodbUrl)
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const serviceRoutes = require("./routes/serviceRoutes")
const messageRoutes = require("./routes/messageRoutes")
const conversationRoutes = require("./routes/conversationRoutes")
const storyRoutes = require("./routes/storyRoutes")
const adminRoutes = require("./routes/adminRoutes")

const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))
db.once("open", () => {
  console.log("Database connected")
})
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/service", serviceRoutes)
app.use("/api/conversation", conversationRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/story", storyRoutes)
app.use("/api/admin", adminRoutes)
app.listen(`${process.env.PORT}`, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
