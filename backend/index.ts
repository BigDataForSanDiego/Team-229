import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const __dirname = path.resolve()

app.use(express.urlencoded({extended: true, limit: '50 mb'}))
app.use(express.json({limit: '50 mb'}))

const port = process.env.PORT || 5000
const start = async () => {
  try{
    await connectDB();
    app.listen(port, () =>{
      console.log(`Server is running on port ${port}`)
    })
  }
  catch(error){
    console.log(error)
  }
}
start();
