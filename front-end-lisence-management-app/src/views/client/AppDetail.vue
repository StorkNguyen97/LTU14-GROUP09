<template>
  <div class="container-fluid mt-2">Hello</div>
</template>
<script>
export default {
  data() {
    return {
      appIndex: null
    };
  },
  mounted() {
    const params = this.$route.params;
    this.appIndex = params.index;
  },
  methods: {}
};
</script>
<style lang="stylus" scoped></style>