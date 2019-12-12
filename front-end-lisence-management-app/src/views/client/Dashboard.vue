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
                  <b-card-text>{{item.description}}</b-card-text>
                  <b-button
                    class="mt-4"
                    variant="primary"
                    v-b-tooltip.hover
                    title="Click to buy"
                    v-if="checkHasLicense(item)"
                    @click="buyLicense(item.id)"
                  >
                    <i class="fa fa-cart-plus"></i>
                  </b-button>
                  <b-button
                    class="mt-4"
                    v-b-tooltip.hover
                    title="Go to app"
                    v-else
                    variant="success"
                    @click="useApp(item,index)"
                  >
                    <i class="fa fa-sign-in"></i>
                  </b-button>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <!-- Confirm Buy -->
    <b-modal
      ref="buyModal"
      title="Confirmation"
      no-close-on-esc
      no-close-on-backdrop
      @ok="onBuy"
    >Are you sure to active this software?</b-modal>

    <!-- Result Buy -->
    <b-modal
      ref="showKey"
      title="Success"
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >Your license: {{licenseKey}}</b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      currentId: null,
      licenseKey: "",
      decoded: null
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getList();
    });
  },
  computed: {
    ...mapState({
      items: state => state.software.items,
      item: state => state.software.item,
      currentUser: state => state.auth.currentUser
    })
  },
  methods: {
    ...mapActions({
      getList: "software/getList",
      genKey: "license/add"
    }),
    buyLicense(id) {
      this.currentId = id;
      this.$refs.buyModal.show();
    },
    onBuy(modal) {
      this.genKey({ software: this.currentId }).then(res => {
        this.licenseKey = res.key;
        this.$refs.buyModal.hide();
        this.$toaster.success("Active Successfully!");
        this.$refs.showKey.show();
      });
    },
    useApp(item, index) {
      this.$router.push({
        path: "app-detail",
        query: {
          index: index,
          name: item.name
        }
      });
    },
    checkHasLicense(item) {
      const listLicense = item.licenses;
      if (!listLicense.length) {
        return true;
      }
      for (let i = 0; i < listLicense.length; i++) {
        if (
          listLicense[i].user === this.currentUser.user.id &&
          listLicense[i].isActive
        ) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>
