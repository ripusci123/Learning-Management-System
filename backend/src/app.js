import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

const  __dirname = path.resolve();

app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended:true,limit : "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"))

//import routes
import userRouter from "./routes/userRoutes/user.routes.js"
import uploaderRouter from "./routes/uploaderRoutes/uploader.routes.js"

//routes declaration
app.use("/api/user",userRouter)
app.use("/api/uploader",uploaderRouter)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  })

export { app }