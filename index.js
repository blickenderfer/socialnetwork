import express from "express"
import mongoose from "mongoose"
import connectToDb from "./config/connection.js";
import routeIndex from "./routes/index.js"
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routeIndex);

connectToDb()

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});

