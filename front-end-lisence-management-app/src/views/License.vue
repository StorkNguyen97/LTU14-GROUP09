<template>
  <div class="animated fadeIn h-100">
    <div class="text-right">
      <b-button variant="primary" @click="openCreateModal()">
        <i class="fa fa-plus mr-1"></i>
        CREATE LICENSE
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
        <template slot="createdAt" slot-scope="data">
          <span>{{ data.value | formatDateTime }}</span>
        </template>
        <template slot="expriedDate" slot-scope="data">
          <span>{{ data.value | formatDateTime }}</span>
        </template>
        <template slot="software" slot-scope="data">
          <span>{{ data.value.name }}</span>
        </template>
        <template slot="user" slot-scope="data">
          <span>{{ data.value.username }}</span>
        </template>
        <template slot="isActive" slot-scope="data">
          <b-badge :variant="data.value ? 'success' : 'secondary'">
            {{
            data.value ? 'ACTIVE' : 'INACTIVE'
            }}
          </b-badge>
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
      :title="!itemInfo.id? 'Create new': 'Update infomation'"
      @ok="handleCreateOk"
      :ok-title="!itemInfo.id? 'Create': 'Update'"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-form-group label="Software">
        <v-select
          v-model="itemInfo.software"
          taggable
          :options="listSoftwares"
          label="name"
          name="software"
          placeholder="Select"
          v-validate="'required'"
          data-vv-as="Software"
        />
        <div
          v-show="errors.has('software')"
          class="validation-message text-danger"
        >{{ errors.first('software') }}</div>
      </b-form-group>
      <b-form-group label="User">
        <v-select
          v-model="itemInfo.user"
          taggable
          :options="listUsers"
          label="username"
          name="user"
          placeholder="Select"
          v-validate="'required'"
          data-vv-as="User"
        />
        <div
          v-show="errors.has('user')"
          class="validation-message text-danger"
        >{{ errors.first('user') }}</div>
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
      this.getListSoftware();
      this.getListUser();
    });
  },
  components: {},
  data: function() {
    return {
      fields: [
        { tdClass: "align-middle", key: "index", label: "#" },
        { tdClass: "align-middle", key: "key" },
        { tdClass: "align-middle", key: "expriedDate" },
        {
          tdClass: "align-middle",
          key: "software"
        },
        {
          tdClass: "align-middle",
          key: "user"
        },
        {
          tdClass: "align-middle",
          key: "isActive"
        },
        { tdClass: "align-middle", key: "createdAt" },
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
      items: state => state.license.items,
      item: state => state.license.item,
      listUsers: state => state.user.items,
      listSoftwares: state => state.software.items
    }),
    countRow() {
      return this.items.length;
    }
  },
  methods: {
    ...mapActions({
      getList: "license/getList",
      getListSoftware: "software/getList",
      getListUser: "user/getList",
      createNew: "license/add",
      getInfo: "license/getById",
      updateInfo: "license/update",
      deleteById: "license/deleteById"
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
