<template>
  <div id="bg">
    <canvas
      ref="canvas"
      @mousemove="draw"
      @mousedown="beginDrawing"
      @mouseup="stopDrawing"
    />
  </div>
</template>

<script>
export default {
  name: "Room",
  data() {
    return {
      socket: null,
      x: 0,
      y: 0,
      isDrawing: false
    };
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.$refs.canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    draw(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    stopDrawing(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
        this.socket.emit("drawing", this.$refs.canvas.toDataURL("image/png"));
      }
    },
    drawUpdate(url) {
      let image = new Image();
      let ctx = this.$refs.canvas.getContext("2d");
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = url;
    }
  },
  mounted() {
    const io = require("socket.io-client");
    this.socket = io("http://localhost:3000");
    this.socket.emit("join-room", this.$route.params.id);
    this.socket.on("drawing", this.drawUpdate);

    let canvas = this.$refs.canvas;
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth;
  }
};
</script>

<style scoped>
#bg {
  background-color: #111;
  height: 100vh;
  width: 100vw;
}
canvas {
  background-color: #222;
}
</style>
