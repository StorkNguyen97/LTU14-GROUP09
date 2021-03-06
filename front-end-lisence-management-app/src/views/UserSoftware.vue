<template>
  <div class="animated fadeIn h-100">
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
        <template slot="software" slot-scope="data">
          <span>{{ data.value.name }}</span>
        </template>
        <template slot="licenses" slot-scope="data">
          <span>{{ data.value }}</span>
        </template>
        <template slot="expriedDate" slot-scope="data">
          <span>{{ data.value | formatDateTime }}</span>
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
      :title="!itemInfo.id? 'Create new': 'Update infomation'"
      @ok="handleCreateOk"
      :ok-title="!itemInfo.id? 'Create': 'Update'"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-form-group label="Name">
        <b-form-input
          maxlength="255"
          v-model="itemInfo.name"
          v-validate="'required'"
          placeholder="Name"
          name="name"
          data-vv-as="Name"
        ></b-form-input>
        <div
          v-show="errors.has('name')"
          class="validation-message text-danger"
        >{{ errors.first('name') }}</div>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea
          maxlength="255"
          v-model="itemInfo.description"
          v-validate="'required'"
          placeholder="Description"
          name="description"
          rows="3"
          max-rows="6"
          data-vv-as="Description"
        ></b-form-textarea>
        <div
          v-show="errors.has('description')"
          class="validation-message text-danger"
        >{{ errors.first('description') }}</div>
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
      this.getList(`?user=${this.authUser.user._id}&isActive=true`);
    });
  },
  components: {},
  data: function() {
    return {
      fields: [
        { tdClass: "align-middle", key: "index", label: "#" },
        { tdClass: "align-middle", key: "software" },
        {
          tdClass: "align-middle",
          key: "key"
        },
        {
          tdClass: "align-middle",
          key: "expriedDate"
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
      items: state => state.license.items,
      item: state => state.license.item,
      authUser: state => state.auth.currentUser
    }),
    countRow() {
      return this.items.length;
    }
  },
  methods: {
    ...mapActions({
      getList: "license/getListByFilter",
      createNew: "software/add",
      getInfo: "software/getById",
      updateInfo: "software/update",
      deleteById: "software/deleteById"
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
      this.itemInfo.status = "ACTIVE";
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
