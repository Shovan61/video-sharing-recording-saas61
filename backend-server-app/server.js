import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import fs from "fs";
import { Readable } from "stream";
import axios from 'axios'

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: process.env.ELECTRON_HOST,
    methods: ["GET", "POST"],
  },
});

let recordedChunks = [];

io.on("connection", (socket) => {
  console.log("😁 Socket connected");

  socket.on("video-chunks", async (data) => {
    console.log("🌲 Video Chunck is sent");
    const writeStream = fs.createWriteStream("temp_upload/" + data.filename);
    recordedChunks.push(data.chunks);
    const videoBlob = new Blob(recordedChunks, {
      type: "video/webm; codecs=vp9",
    });
    const buffer = Buffer.from(await videoBlob.arrayBuffer());
    const readStream = Readable.from(buffer);
    readStream
      .pipe(writeStream)
      .on("finish", () => [console.log("🌵 Chunk Saved!!!")]);
  });

  socket.on("process-video", async (data) => {
    console.log("🌲proccessing video");
  });

  socket.on("disconnect", async (data) => {
    console.log("🌲 Socket.id", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Listening to port 5000! 🤩");
});
