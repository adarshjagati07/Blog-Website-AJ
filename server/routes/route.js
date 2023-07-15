import express from "express";
import { signupUser } from "../controller/user-controller.js";

const Router = express.Router();

Router.post(`/signup`, signupUser);

export default Router;
