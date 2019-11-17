<template>
  <div>
    <div class="text-right">
      <b-button variant="outline-primary" @click="openModalCreated">
        <i class="fa fa-plus mr-1"></i>
        Create License
      </b-button>
    </div>
    <b-card title="List License Key" class="mt-2">
      <b-table striped hover :fields="fields" show-empty :items="items">
        <template slot="index" slot-scope="data">{{
          (currentPage - 1) * CONSTANTS.ITEM_PER_PAGE + (data.index + 1)
        }}</template>
        <template slot="createdAt" slot-scope="data">
          <span>{{ data.value | formatDateTime }}</span>
        </template>
        <template slot="expriedDate" slot-scope="data">
          <span>{{ data.value | formatDateTime }}</span>
        </template>
        <template slot="actions">
          <b-button
            variant="primary"
            class="mr-1 min-width-none"
            v-b-tooltip.hover
            title="Edit"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button
            variant="danger"
            v-b-tooltip.hover
            class="min-width-none"
            title="Delete"
          >
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
        <template slot="empty">
          <div class="text-center">
            <span>No record found</span>
          </div>
        </template></b-table
      >
      <div v-if="countRow > CONSTANTS.ITEM_PER_PAGE" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="countRow"
          :per-page="CONSTANTS.ITEM_PER_PAGE"
          :hide-goto-end-buttons="true"
          class="my-0"
          align="center"
        ></b-pagination>
      </div>
    </b-card>

    <!-- Create/Edit License Info -->
    <b-modal
      ref="createOrUpdateLicenseModal"
      :ok-title="`${licenseInfo._id ? 'Update' : 'Create'}`"
      :title="
        `${licenseInfo.id ? 'Update License Info' : 'Create New License'}`
      "
      @ok="handleCreateGroupOk"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-form-group label="License Key">
        <b-form-input v-model="licenseInfo.key" />
      </b-form-group>
      <b-form-group label="Expired Date">
        <b-form-input maxlength="255" v-model="licenseInfo.expriedDate" />
      </b-form-group>
      <b-form-group label="Software">
        <b-form-input maxlength="255" v-model="licenseInfo.software" />
      </b-form-group>
      <b-form-group label="Devices">
        <b-form-input maxlength="255" v-model="licenseInfo.key" />
      </b-form-group>
    </b-modal>

    <!-- Confirm Delete License -->
    <b-modal
      ref="deleteGroupModal"
      title="Confirmation"
      no-close-on-esc
      no-close-on-backdrop
      ok-variant="danger"
      @ok="onDeleteGroup"
      >Are you sure to delete this license?</b-modal
    >
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import CONSTANTS from "@/constants";
export default {
  mounted() {
    this.fetchItems();
  },
  data() {
    return {
      fields: [
        { tdClass: "align-middle", key: "index", label: "#" },
        {
          tdClass: "align-middle",
          key: "key",
          label: "Key"
        },
        {
          tdClass: "align-middle",
          key: "expriedDate",
          label: "Expried Date"
        },
        {
          tdClass: "align-middle",
          key: "createdAt",
          label: "Created At"
        },
        {
          thClass: "fixed-actions-col",
          key: "actions",
          label: "Action"
        }
      ],
      CONSTANTS,
      currentPage: 1,
      licenseInfo: {}
    };
  },
  computed: {
    ...mapState({
      items: state => state.license.items
    }),
    countRow() {
      return this.items.length;
    }
  },
  methods: {
    ...mapActions({
      fetchItems: "license/fetchItems"
    }),
    handleCreateGroupOk() {},
    onDeleteGroup() {},
    openModalCreated() {
      this.resetForm();
      this.$refs.createOrUpdateLicenseModal.show();
    },
    resetForm() {
      this.licenseInfo = {};
    }
  }
};
</script>
<style></style>
