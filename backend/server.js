
const io = require("socket.io")(3000, { cors: true });

io.on("connection", socket => {
	socket.on("join-room", (room) => {
		socket.join(room);
		socket.room = room;
		socket.emit("joined");
	});
	socket.on("drawing", (data) => {
		socket.to(socket.room).broadcast.emit("drawing", data)
	});
});