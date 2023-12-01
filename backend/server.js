import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import connectDb from "./config/configDb.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"

           


dotenv.config() 

const PORT = process.env.PORT || 5000
const app = express()  

const corsOptions = {
    origin: 'https://quiet-daffodil-25f6c7.netlify.app',
    methods: 'GET,PUT,POST,DELETE',
  };

  
  app.use(cors(corsOptions));
//   app.use(cors())

connectDb()     
app.use(express.json())
app.use(express.urlencoded({limit: "10mb", extended:true}))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({limit: "10mb", extended:true}))
app.use(cookieParser())
app.use("/api/users", userRoutes)
app.use("/api/posts",  postRoutes)   
// app.use(cors())







 
  

app.use(notFound)
app.use(errorHandler)
app.listen(process.env.PORT, ()=>{
    console.log(`App is running on ${PORT}`);
})


