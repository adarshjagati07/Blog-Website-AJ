import express, { Router } from "express";
import morgan from "morgan";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
dotenv.config();

app.use(morgan("dev"));

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/`, router);

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`Sever is listening on port : ${PORT}`);
});
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);
