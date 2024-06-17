import {connect, disconnect} from "mongoose";
import MyError from "../utils/MyError.js";

async function connectToDb() {
  try {
    await connect(process.env.DB_URL);
    console.log("server connected to db successfully");
  }
  catch(err) {
    console.log("server COULD NOT connect to db");
    throw new MyError(err.message, err.code);
  }
}


async function disconnectFromDb() {
  try {
    await disconnect();
    console.log("disconnected from db");
  }
  catch(err) {
    console.log("couldn't disconnect from the db");
  }
}

export {connectToDb, disconnectFromDb};