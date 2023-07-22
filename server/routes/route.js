import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import {
	createPost,
	getAllPosts,
	getPost,
	updatePost,
	deletePost
} from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from "../utils/upload.js";

const Router = express.Router();

Router.post(`/signup`, signupUser);
Router.post(`/login`, loginUser);
Router.post("/file/upload", upload.single("file"), uploadImage);
Router.get("/file/:filename", getImage);
Router.post("/create", authenticateToken, createPost);
Router.get("/posts", authenticateToken, getAllPosts);
Router.get("/post/:id", authenticateToken, getPost);
Router.put(`/update/:id`, authenticateToken, updatePost);
Router.delete(`/delete/:id`, authenticateToken, deletePost);

export default Router;
