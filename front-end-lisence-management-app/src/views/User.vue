<template>
  <div class="animated fadeIn h-100">
    <div class="text-right">
      <b-button variant="primary" @click="openCreateModal()">
        <i class="fa fa-plus mr-1"></i>
        CREATE USER
      </b-button>
    </div>
    <b-card class="mt-2">
      <b-table
        striped
        hover
        :items="items"
        :fields="fields"
        show-empty
        :current-page="currentPage"
        :per-page="CONSTANTS.ITEM_PER_PAGE"
      >
        <template
          slot="index"
          slot-scope="data"
        >{{ (currentPage - 1) * CONSTANTS.ITEM_PER_PAGE + (data.index + 1) }}</template>
        <template slot="role" slot-scope="data">
          <span>{{ data.value.name }}</span>
        </template>
        <template slot="devices" slot-scope="data">
          <span v-for="(item,index) in data.value" :key="index">
            <span>{{ item.name }}</span>
            <span v-if="index !== data.value.length -1">{{", "}}</span>
          </span>
        </template>
        <template slot="actions" slot-scope="row">
          <b-button
            variant="primary"
            class="mr-1 min-width-none"
            @click="showUpdateGroupModal(row.item._id)"
            v-b-tooltip.hover
            title="Edit"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button
            variant="danger"
            @click="confirmDelete(row.item._id)"
            v-b-tooltip.hover
            class="min-width-none"
            title="Delete"
          >
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
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

    <!-- Create/Edit Info -->
    <b-modal
      ref="createOrUpdateModal"
      :title="!itemInfo._id? 'Create new': 'Update infomation'"
      @ok="handleCreateOk"
      :ok-title="!itemInfo._id? 'Create': 'Update'"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-form-group label="User Name">
        <b-form-input
          maxlength="255"
          v-model="itemInfo.username"
          v-validate="'required'"
          placeholder="User Name"
          name="userName"
          data-vv-as="User Name"
        ></b-form-input>
        <div
          v-show="errors.has('userName')"
          class="validation-message text-danger"
        >{{ errors.first('userName') }}</div>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input
          type="email"
          maxlength="255"
          v-model="itemInfo.email"
          v-validate="'required'"
          placeholder="Email"
          name="email"
          data-vv-as="Email"
        ></b-form-input>
        <div
          v-show="errors.has('email')"
          class="validation-message text-danger"
        >{{ errors.first('email') }}</div>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input type="password" maxlength="255" v-model="itemInfo.password"></b-form-input>
      </b-form-group>
      <b-form-group label="Role">
        <v-select
          v-model="itemInfo.role"
          :options="['Administrator','Authenticated']"
          name="role"
          placeholder="Select"
          v-validate="'required'"
          data-vv-as="Role"
        />
        <div
          v-show="errors.has('role')"
          class="validation-message text-danger"
        >{{ errors.first('role') }}</div>
      </b-form-group>
    </b-modal>

    <!-- Confirm Delete -->
    <b-modal
      ref="deleteModal"
      title="Confirmation"
      no-close-on-esc
      no-close-on-backdrop
      ok-variant="danger"
      @ok="onDelete"
    >Are you sure to delete?</b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CONSTANTS from "@/constants";
export default {
  mounted: function() {
    this.$nextTick(function() {
      this.getList();
    });
  },
  components: {},
  data: function() {
    return {
      fields: [
        { tdClass: "align-middle", key: "index", label: "#" },
        { tdClass: "align-middle", key: "username" },
        { tdClass: "align-middle", key: "email" },
        { tdClass: "align-middle", key: "role" },
        {
          thClass: "fixed-actions-col",
          key: "actions"
        }
      ],
      itemInfo: {},
      currentId: null,
      CONSTANTS,
      currentPage: 1
    };
  },
  computed: {
    ...mapState({
      items: state => state.user.items,
      item: state => state.user.item
    }),
    countRow() {
      return this.items.length;
    }
  },
  methods: {
    ...mapActions({
      getList: "user/getList",
      createNew: "user/add",
      getInfo: "user/getById",
      updateInfo: "user/update",
      deleteById: "user/deleteById"
    }),
    handleCreateOk(modal) {
      modal.preventDefault();
      this.onSubmit();
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.itemInfo._id) {
            this.updateGroup();
          } else {
            this.addGroup();
          }
          this.$refs.createOrUpdateModal.hide();
          this.$toaster.success(
            `${this.itemInfo._id ? "Update" : "Create"} Successfully!`
          );
        }
      });
    },
    async addGroup() {
      delete this.itemInfo._id;
      await this.createNew(this.itemInfo);
    },
    async showUpdateGroupModal(id) {
      this.resetForm();
      await this.getInfo(id);
      this.itemInfo = { ...this.item };
      this.$refs.createOrUpdateModal.show();
    },
    async updateGroup() {
      await this.updateInfo(this.itemInfo);
    },
    async onDelete(modal) {
      modal.preventDefault();
      await this.deleteById(this.currentId);
      if (
        this.items.length / this.CONSTANTS.ITEM_PER_PAGE ===
        this.currentPage - 1
      ) {
        this.currentPage--;
      }
      this.$refs.deleteModal.hide();
      this.$toaster.success("Delete Successfully!");
    },
    openCreateModal() {
      this.resetForm();
      this.$refs.createOrUpdateModal.show();
    },
    async confirmDelete(id) {
      this.currentId = id;
      this.$refs.deleteModal.show();
    },
    resetForm() {
      this.itemInfo = {};
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
