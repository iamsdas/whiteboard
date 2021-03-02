const io = require("socket.io")(3000);

io.on("connection", socket => {
	socket.on("join-room", (room) => {
		socket.join(room);
		socket.set("room", room);
		socket.emit("joined");
	});
	socket.on("drawing", (data) => {
		socket.to(socket.get("room")).broadcast.emit("drawing", data)
	});
	console.log(socket.id);
});