<template>
  <div
    class="container-fluid d-flex justify-content-center align-items-center"
    id="root"
  >
    <div class="card shadow-lg" style="max-width:300px;">
      <div class="card-body text-center">
        <form class="form-signin">
          <h1 class="card-title mb-3">Whiteboard</h1>
          <div id="txt">
            This is a free collaborative whiteboard. Get started by entering
            code to join or create a room.
          </div>

          <div class="input-group mb-3 mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Code"
              v-model="id"
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              @click.prevent="submit"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      id: ""
    };
  },
  methods: {
    submit() {
      this.$router.push("/room/" + this.id);
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100vh;
  width: 100vw;
}
h1 {
  font-family: "Akaya Telivigala", cursive;
}
#root {
  height: 100vh;
}
.text-center {
  font-size: 20px;
}
</style>
