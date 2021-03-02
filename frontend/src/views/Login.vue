<template>
  <form>
    <label for="id"></label>
    <input type="text" name="id" v-model="id" />
    <button type="submit" @click.stop.prevent="submit()">
      join/create room
    </button>
  </form>
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
