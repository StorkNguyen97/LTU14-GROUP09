<template>
  <div class="app">
    <nav class="app-header navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">List Softwares</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="app-body">
      <main class="h-100">
        <div class="container-fluid mt-2">
          <b-row class="p-4">
            <b-col v-for="item in items" :key="item._id" :cols="4">
              <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body title="Horizontal Card">
                      <b-card-text>
                        This is a wider card with supporting text as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {};
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getList();
    });
  },
  computed: {
    ...mapState({
      items: state => state.software.items,
      item: state => state.software.item
    })
  },
  methods: {
    ...mapActions({
      getList: "software/getList"
    })
  }
};
</script>
