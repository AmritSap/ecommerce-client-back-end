import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(morgan("tiny"));

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "public")));
// // parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));

// parse application/json this code helps to take request from api or rest api
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

///////////////////// database///////////////////////
import mongoClient from "./config/db.js";
mongoClient();  

// //////////////////Routers////////////////
import NewUserRouter from "./routers/NewUser.router.js";
import loginRouter from "./routers/login.router.js"

// /////////////////APIS////////////////////
app.use("/api/v1/create-account", NewUserRouter);  
app.use("/api/v1/login", loginRouter);

// app.listen(3000);
app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`Server is running at http://localhost:${PORT}`);
});
