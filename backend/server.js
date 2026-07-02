import express from "express";

import {createServer} from "http";
import {Server} from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";

import dotenv from "dotenv";
dotenv.config();

const Port = process.env.PORT ;


const app = express();

app.use(express.static("public"));

const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const ySocketIO = new YSocketIO(io)
ySocketIO.initialize();

httpServer.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});




app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server is healthy",
    status: "success",
  })
});
