<template>
  <div>
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
            <a class="nav-link" href="#/user/dashboard">Home</a>
          </li>
               <li class="nav-item">
            <a class="nav-link" href="#/user/software">My Softwares</a>
          </li>
        </ul>
        <div style="padding: 40px">
          <button class="btn btn-outline-success" @click="openLicenseModal">Active license key</button>
        </div>
      </div>
    </nav>
    <b-modal
      title="Active License Key"
      ref="licenseKeyModal"
      @ok="verifyKey"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-form-group label="License key">
        <b-form-input
          maxlength="255"
          v-model="key"
          v-validate="'required'"
          placeholder="License key"
          name="key"
          data-vv-as="License key"
        ></b-form-input>
        <div
          v-show="errors.has('userName')"
          class="validation-message text-danger"
        >{{ errors.first('userName') }}</div>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Header",
  data: function() {
    return {
      key: ""
    };
  },
  computed: {
    ...mapState({
      authUser: state => state.auth.currentUser,
      newActiveKey: state => state.license.newActiveKey
    })
  },
  methods: {
    ...mapActions({
      verify: "license/verify"
    }),
    openLicenseModal() {
      this.resetForm();
      this.$refs.licenseKeyModal.show();
    },
    resetForm() {
      this.key = "";
    },
    async verifyKey(modal) {
      try {
        await this.verify({ key: this.key, user: this.authUser.user._id });
        this.$toaster.success("Active License key successfully!")
      } catch (err) {
        this.$toaster.error("Invalid license key!")
      }
    }
  }
};
</script>