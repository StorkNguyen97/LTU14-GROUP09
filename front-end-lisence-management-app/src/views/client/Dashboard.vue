<template>
  <div>
    <div class="container-fluid mt-2">
      <b-row class="p-4">
        <b-col v-for="(item, index) in items" :key="item._id" :cols="4">
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  v-if="index === 0"
                  src="https://newapp.vn/ios/wp-content/uploads/2017/11/Afterlight_2_icon.jpg"
                  class="rounded-0"
                ></b-card-img>
                <b-card-img
                  v-if="index === 1"
                  src="https://1.bp.blogspot.com/-lo8M0vBglRE/VsIFfTtoUpI/AAAAAAAADrg/p8BY-ZJfIso/s1600/unnamed.webp"
                  class="rounded-0"
                ></b-card-img>
                <b-card-img
                  v-if="index === 2"
                  src="https://cdn.jim-nielsen.com/ios/512/maxcurve-2016-05-09.png"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body :title="item.name">
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
