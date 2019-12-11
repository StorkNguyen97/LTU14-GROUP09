<template>
  <div class="app">
    <Header />
    <div class="app-body">
      <main class="h-100 w-100">
        <div class="container-fluid mt-2">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "DefaultClientLayout",
  components: {
    Header
  }
};
</script>
