const io = require("socket.io")((process.env.PORT || 3000), { cors: true });

io.on("connection", socket => {
	socket.on("join-room", (room) => {
		socket.join(room);
		socket.roomId = room;
		socket.emit("joined");
	});
	socket.on("drawing", (data) => {
		socket.to(socket.roomId).broadcast.emit("drawing", data);
	});
});