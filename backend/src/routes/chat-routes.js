import { Router } from "express";
import { allChats, deleteChats, newChat } from "../controllers/chat-controllers.js";
import { newChatValidator } from "../utils/validators.js";
import { isLoggedIn } from "../utils/authorization-middlewares.js";


const chatRouter = Router();

chatRouter.post("/new", isLoggedIn, newChatValidator, newChat);
chatRouter.get("/", isLoggedIn, allChats);
chatRouter.delete("/", isLoggedIn, deleteChats);

export default chatRouter;