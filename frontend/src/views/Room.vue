<template>
  <div id="bg">
    <canvas
      ref="canvas"
      @mousemove="draw"
      @mousedown="beginDrawing"
      @mouseup="stopDrawing"
      @mouseleave="cancelDrawing"
      :width="canvasWidth"
      :height="canvasHeight"
    />
    <div id="bar">
      <div class="bar-item">
        <router-link to="/">home</router-link>|
        <a href="https://github.com/iamsdas/whiteboard">github</a>|
        <button @click="clearCanvas">clear</button>
      </div>
      <div class="bar-item">status : {{ connection }}</div>
    </div>
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
      canvasWidth: 0,
      canvasHeight: 0,
      isDrawing: false,
      connection: "connecting"
    };
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.$refs.canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 7;
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
        this.isDrawing = false;
        this.socket.emit("drawing", this.$refs.canvas.toDataURL("image/png"));
      }
    },
    cancelDrawing() {
      this.isDrawing = false;
    },
    drawUpdate(url) {
      let image = new Image();
      let ctx = this.$refs.canvas.getContext("2d");
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = url;
    },
    handleResize() {
      let state = this.$refs.canvas.toDataURL("image/png");
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight - 25;
      this.drawUpdate(state);
    },
    setConnected() {
      this.connection = "connected";
    },
    clearCanvas() {
      let ctx = this.$refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.socket.emit("drawing", this.$refs.canvas.toDataURL("image/png"));
    }
  },
  mounted() {
    const io = require("socket.io-client");
    this.socket = io(process.env.VUE_APP_SERVER);
    this.socket.emit("join-room", this.$route.params.id);
    this.socket.on("drawing", this.drawUpdate);
    this.socket.on("joined", this.setConnected);
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#bg {
  background-color: #111;
  height: 100vh;
  width: 100vw;
}
#bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 25px;
}
.bar-item {
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
}
button,
a {
  background: none;
  text-decoration: none;
  color: inherit;
  border: none;
  padding: 0;
  padding-right: 5px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
canvas {
  background-color: white;
  display: block;
}
</style>
