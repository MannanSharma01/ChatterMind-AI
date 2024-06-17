import server from "./app.js";
import { connectToDb } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

connectToDb()
  .then( () => {
    server.listen(PORT, () => {
      console.log("server-A started");
    });
  })
  .catch((err) => {
    console.log("db connection error: ", err);
  });





