import {config} from "dotenv";
import express from "express";
import appRouter from "./routes/index-routes.js";
import passport from "passport"
import LocalStrategy from "passport-local";
import User from "./models/user.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import cors from "cors"
import https from 'https';
import cookieParser from "cookie-parser";
import replaceAll from "./utils/replaceAll.js";


config();
const app = express();

const sslOptions = {
  key: replaceAll(process.env.KEY_PEM),
  cert: replaceAll(process.env.CERT_PEM)
}

const server = https.createServer(sslOptions, app);

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  crypto: {
    secret: process.env.SESSION_SECRET
  },
  touchAfter: 24*60*60,    // 24hrs

});

store.on("error", (err) => {
  console.log("error in the session-store", err);     
})

const sessionOptions = {
  store,            // important for production
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "none",
    secure: true,
    httpOnly: true,

    expires: Date.now() + 3*24*60*60*1000,         // 3 days
    maxAge: 3*24*60*60*1000
  }
} ;

// middlewares
app.use(cors({          /** CHANGE TO BE MADE IN THE URL */
  origin: "https://chattermindai-mannan-sharmas-projects.vercel.app/",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(flash());

app.use( passport.initialize() );
app.use( passport.session() );
passport.use( new LocalStrategy(User.authenticate()) );

passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.use("/api/v1", appRouter);



export default server;