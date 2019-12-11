<template>
  <div class="container-fluid mt-2">
    <b-card v-if="appIndex === 0" :header="appName" header-tag="header">
      <b-row>
        <b-col cols="6">
          <b-form-group label="Number One:">
            <b-form-input
              v-model="form.numberOne"
              type="number"
              placeholder="Insert the first number"
            />
          </b-form-group>
          <b-form-group label="Number Two:">
            <b-form-input
              v-model="form.numberTwo"
              type="number"
              placeholder="Insert the second number"
            />
          </b-form-group>
          <b-button variant="primary" class="mr-2" @click="submitApp1">Submit</b-button>
          <b-button variant="secondary" @click="reset">Reset</b-button>
        </b-col>
        <b-col cols="6">
          <span class="font-weight-bold">Result:</span>
          <span class="ml-5 display-1 text-success">{{result}}</span>
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="appIndex === 1" :header="appName" header-tag="header">
      <b-row>
        <b-col cols="6">
          <b-form-group label="Number One:">
            <b-form-input
              v-model="form.numberOne"
              type="number"
              placeholder="Insert the first number"
            />
          </b-form-group>
          <b-form-group label="Number Two:">
            <b-form-input
              v-model="form.numberTwo"
              type="number"
              placeholder="Insert the second number"
            />
          </b-form-group>
          <b-button variant="primary" class="mr-2" @click="submitApp2">Submit</b-button>
          <b-button variant="secondary" @click="reset">Reset</b-button>
        </b-col>
        <b-col cols="6">
          <span class="font-weight-bold">Result:</span>
          <span class="ml-5 display-1 text-success">{{result}}</span>
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="appIndex === 2" :header="appName" header-tag="header">
      <b-row>
        <b-col cols="6">
          <b-form-group label="Number One:">
            <b-form-input
              v-model="form.numberOne"
              type="number"
              placeholder="Insert the first number"
            />
          </b-form-group>
          <b-form-group label="Number Two:">
            <b-form-input
              v-model="form.numberTwo"
              type="number"
              placeholder="Insert the second number"
            />
          </b-form-group>
          <b-button variant="primary" class="mr-2" @click="submitApp3">Submit</b-button>
          <b-button variant="secondary" @click="reset">Reset</b-button>
        </b-col>
        <b-col cols="6">
          <span class="font-weight-bold">Result:</span>
          <span class="ml-5 display-1 text-success">{{result}}</span>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      appIndex: null,
      appName: "",
      form: {
        numberOne: null,
        numberTwo: null
      },
      result: null
    };
  },
  mounted() {
    const query = this.$route.query;
    this.appIndex = query.index;
    this.appName = query.name;
  },
  methods: {
    submitApp1() {
      this.result =
        parseInt(this.form.numberOne) + parseInt(this.form.numberTwo);
    },
    submitApp2() {
      this.result =
        parseFloat(this.form.numberOne) - parseFloat(this.form.numberTwo);
    },
    submitApp3() {
      this.result =
        parseInt(this.form.numberOne) * parseInt(this.form.numberTwo);
    },
    reset() {
      this.form = {};
      this.result = null;
    }
  }
};
</script>
<style lang="stylus" scoped></style>