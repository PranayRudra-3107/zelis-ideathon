import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");	
  io.emit("firstEvent", "testing first event");
  

  
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});
io.listen(5000);