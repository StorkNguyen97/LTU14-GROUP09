<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="4">
          <b-card no-body class="p-4">
            <b-card-body>
              <b-form @submit.prevent="login">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    class="form-control"
                    placeholder="Username"
                    v-validate="'required'"
                    data-vv-as="Username"
                    name="userName"
                    v-model="form.identifier"
                  />
                  <div
                    v-show="errors.has('userName')"
                    class="validation-message text-danger"
                  >{{ errors.first('userName') }}</div>
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-validate="'required'"
                    data-vv-as="Password"
                    name="password"
                    v-model="form.password"
                  />
                  <div
                    v-show="errors.has('password')"
                    class="validation-message text-danger"
                  >{{ errors.first('password') }}</div>
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" type="submit" class="px-4">Login</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        identifier: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      actionLogin: "auth/actionLogin"
    }),
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.actionLogin(this.form)
            .then(async () => {
              this.$router.push("/");
              this.$toaster.success("Login Successfully!");
            })
            .catch(() => {
              this.$toaster.error("Login Failed!");
            });
        }
      });
    }
  }
};
</script>
