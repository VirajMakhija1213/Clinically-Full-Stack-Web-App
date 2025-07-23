const express=require("express")
const app=express();
const cors=require("cors")
require("dotenv").config()
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server Started At Port ${PORT}`)
})
//Middlewares
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(
	cors({
		origin:"http://localhost:1234",
		credentials:true,
	})
)
app.use(cookieParser())
//Routes
const route=require("./routes/route");
app.use("/api/v1",route)
//Database Connecton
const dbConnect=require("./config/database")
dbConnect();
//Default route
app.get("/",(req,res)=>{
    res.send("This is the default route for backend project")
})