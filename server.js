import express from "express"
import cookieParser from "cookie-parser";
import router from "./routes.js";
import { db } from "./utils/db.js";
import dotenv from "dotenv"
import cors from "cors";
import { deserializeUser } from "./middleware/deserializeUser.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use(cors({
    origin: process.env.NODE_ENV === "deployement" ? "https://presidio-frontend-ten.vercel.app" : "http://localhost:5173",

    credentials:true
}));

app.use(deserializeUser);

app.use("/v1",router);

app.use((req,res)=>{
    res.status(404).json({message:"Not found"});
})

app.listen(3000,async ()=>{
    console.log(process.env.NODE_ENV);
    console.log("Server is running on port 3000");
    await db();
});