const { Server } = require("socket.io"); // Nhập Socket.IO
const http = require("http"); // Nhập module http để tạo server

const server = http.createServer(); // Tạo một HTTP server

const io = new Server(server, {
  // Tạo một instance của Socket.IO và liên kết với server
  cors: {
    origin: "*", // Cho phép tất cả các nguồn kết nối
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("joinRoom", (room) => {
    socket.join(room); // Thêm client vào room cụ thể
    console.log(`Client joined room: ${room}`);
  });

  socket.on("message", (data) => {
    const { roomId, userName, message, isMyself } = data;

    console.log(
      `Received message from ${userName} in room ${roomId}:`,
      message
    );

    // Phát tin nhắn tới tất cả các client khác trong cùng room
    io.to(roomId).emit("message", {
      roomId,
      userName,
      message,
      isMyself,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Bắt đầu server tại cổng 8080
server.listen(8080, () => {
  console.log("Socket.IO Server is running on ws://localhost:8080");
});