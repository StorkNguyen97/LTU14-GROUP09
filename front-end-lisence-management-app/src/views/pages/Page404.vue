<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="clearfix text-center">
        <h1 class="display-3 mr-4">404</h1>
        <h4 class="pt-3">Oops! You're lost.</h4>
        <p class="text-muted">The page you are looking for was not found.</p>
        <b-button variant="outline-primary" @click="goToHome">Back to home</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
  methods: {
    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>
