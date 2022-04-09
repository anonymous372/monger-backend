import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"

import router from "./api/index.js" 

const app = express();

const PORT = 4000

// Config Body Parser
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json())
app.use(cors());


const CONNECTION_URL = "mongodb+srv://ace:ace@cluster0.a5ivo.mongodb.net/Monger?retryWrites=true&w=majority"

// Database connection
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`)
    }))
  .catch((error) => {
      console.log(`${error} did not connect`)
    }
);

app.use(router)