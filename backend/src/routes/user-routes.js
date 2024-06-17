import { Router } from "express";
import { loginDone, signup, loginFail, checkAuthStatus, logout } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator } from "../utils/validators.js";
import passport from "passport";
import { isLoggedIn, notLoggedIn } from "../utils/authorization-middlewares.js";

const userRouter = Router();

userRouter.post("/signup", notLoggedIn, signupValidator, signup);
userRouter.post("/login", notLoggedIn, loginValidator, passport.authenticate("local", {failureRedirect: "/api/v1/user/loginFail"}), loginDone);
userRouter.get("/loginFail", loginFail );
userRouter.get("/logout", isLoggedIn, logout);
userRouter.get("/authentication-status", checkAuthStatus);

export default userRouter;