<template>
  <div>
    <div v-for="key in keys" :key="key._id">
      <span>{{key.name}}:</span>
      <span>{{key.keyAccess}}</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("key", ["keys"])
  },
  methods: {
    ...mapActions("key", ["fetchKeys"])
  },
  async created() {
    await this.fetchKeys();
  }
};
</script>
<style>
</style>
