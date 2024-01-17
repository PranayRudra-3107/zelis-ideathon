import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendNotification", ({ senderRole, receiverRole }) => {
    // Handle sending notifications
    const { socketId } = getRole(receiverRole);
    io.to(socketId).emit("getNotification", {
      senderRole,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});
io.listen(5000);

const getRole = (role) => {
  return ((Role) => Role.role === role);
};
