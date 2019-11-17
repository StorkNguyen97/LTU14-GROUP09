<template>
  <div>
    <b-card title="List License Key">
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
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import CONSTANTS from '@/constants';
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
      currentPage: 1
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
    })
  }
};
</script>
<style></style>
