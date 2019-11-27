<template>
    <div class="animated fadeIn h-100">
        <div class="page-content sub-header-page-content p-4">
            <b-table
                striped
                hover
                dark
                :items="listGroups"
                :fields="fields"
                show-empty
                :current-page="currentPage"
                :per-page="CONSTANTS.ITEM_PER_PAGE"
            >
                <!-- <template
                    slot="index"
                    slot-scope="data"
                >{{ (currentPage - 1) * CONSTANTS.ITEM_PER_PAGE + (data.index + 1) }}</template>
                <template slot="createdAt" slot-scope="data">
                    <span>{{ data.value }}</span>
                </template>
                <template slot="actions" slot-scope="row">
                    <b-button
                        variant="primary"
                        class="mr-1 min-width-none"
                        @click="showUpdateGroupModal(row.item.id)"
                        v-b-tooltip.hover
                        :title="$t('common.edit')"
                    >
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button
                        variant="danger"
                        @click="confirmDelete(row.item.id)"
                        v-b-tooltip.hover
                        class="min-width-none"
                        :title="$t('common.delete')"
                    >
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
                <template slot="empty">
                    <div class="text-center">
                        <span>{{ $t('groups.empty') }}</span>
                    </div>
                </template> -->
            </b-table>
            <div v-if="countRow > CONSTANTS.ITEM_PER_PAGE" class="my-1">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="countRow"
                    :per-page="CONSTANTS.ITEM_PER_PAGE"
                    :hide-goto-end-buttons="true"
                    :prev-text="$t('common.prevPage')"
                    :next-text="$t('common.nextPage')"
                    class="my-0"
                    align="center"
                ></b-pagination>
            </div>
        </div>

        <!-- Create/Edit Group Info -->
        <b-modal
            ref="createOrUpdateGroupModal"
            :ok-title="`${groupInfo.id ? $t('common.update') : $t('common.create')}`"
            :title="`${groupInfo.id ? $t('groups.updateGroup') : $t('groups.createGroup')}`"
            :cancel-title="$t('common.cancel')"
            @ok="handleCreateGroupOk"
            no-close-on-esc
            no-close-on-backdrop
        >
            <b-form-group :label="$t('groups.groupName')">
                <b-form-input
                    maxlength="255"
                    v-model="groupInfo.name"
                    v-validate="'required'"
                    :placeholder="$t('groups.groupName')"
                    name="groupName"
                    :data-vv-as="$t('groups.groupName')"
                ></b-form-input>
                <div
                    v-show="errors.has('groupName')"
                    class="validation-message text-danger"
                >{{ errors.first('groupName') }}</div>
            </b-form-group>
            <b-form-group :label="`${$t('common.description')} ${$t('common.optional')}`">
                <b-form-textarea
                    v-model="groupInfo.desc"
                    maxlength="255"
                    :placeholder="$t('common.description')"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-form-group>
        </b-modal>

        <!-- Confirm Delete Group -->
        <b-modal
            ref="deleteGroupModal"
            :title="$t('common.confirmation')"
            no-close-on-esc
            no-close-on-backdrop
            :ok-title="$t('common.delete')"
            :cancel-title="$t('common.cancel')"
            ok-variant="danger"
            @ok="onDeleteGroup"
        >{{ $t('groups.deleteConfirmMsg') }}</b-modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CONSTANTS from '@/constants';
export default {
    mounted: function() {
        this.$nextTick(function() {
            this.getListGroups();
        });
    },
    components: {
        ManageSubNav
    },
    data: function() {
        return {
            fields: [
                { tdClass: 'align-middle', key: 'index', label: '#' },
                { tdClass: 'align-middle', key: 'name', label: this.$i18n.t('common.name') },
                { tdClass: 'align-middle', key: 'desc', label: this.$i18n.t('common.description') },
                {
                    tdClass: 'align-middle',
                    key: 'createdAt',
                    label: this.$i18n.t('common.lastCreated')
                },
                {
                    thClass: 'fixed-actions-col',
                    key: 'actions',
                    label: this.$i18n.t('common.actions')
                }
            ],
            groupInfo: {
                id: null,
                name: '',
                desc: ''
            },
            currentGroupId: null,
            CONSTANTS,
            currentPage: 1
        };
    },
    computed: {
        ...mapState({
            listGroups: state => state.group.groups,
            listUsersByGroup: state => state.user.usersByGroup,
            group: state => state.group.group
        }),
        countRow() {
            return this.listGroups.length;
        }
    },
    methods: {
        ...mapActions({
            getListGroups: 'license/getListGroups',
            createNewGroup: 'license/createNewGroup',
            getGroupInfo: 'license/getGroupInfo',
            updateGroupInfo: 'license/updateGroupInfo',
            deleteGroupById: 'license/deleteGroupById'
        }),
        handleCreateGroupOk(modal) {
            modal.preventDefault();
            this.onSubmit();
        },
        onSubmit() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    if (this.groupInfo.id) {
                        this.updateGroup();
                    } else {
                        this.addGroup();
                    }
                    this.$refs.createOrUpdateGroupModal.hide();
                    this.$toaster.success(
                        `${
                            this.group.id
                                ? this.$i18n.t('common.update')
                                : this.$i18n.t('common.create')
                        } ${this.$i18n.t('groups.groupSuccess')}`
                    );
                }
            });
        },
        async addGroup() {
            delete this.groupInfo.id;
            await this.createNewGroup(this.groupInfo);
        },
        async showUpdateGroupModal(groupId) {
            this.resetForm();
            await this.getGroupInfo({ id: groupId });
            this.groupInfo = { ...this.group };
            this.$refs.createOrUpdateGroupModal.show();
        },
        async updateGroup() {
            await this.updateGroupInfo(this.groupInfo);
        },
        async onDeleteGroup(modal) {
            modal.preventDefault();
            await this.deleteGroupById({ id: this.currentGroupId });
            if (this.listGroups.length / this.CONSTANTS.ITEM_PER_PAGE === this.currentPage - 1) {
                this.currentPage--;
            }
            this.$refs.deleteGroupModal.hide();
            this.$toaster.success(this.$i18n.t('groups.deleteGroupMess'));
        },
        openCreateModal() {
            this.resetForm();
            this.$refs.createOrUpdateGroupModal.show();
        },
        async confirmDelete(groupId) {
            this.currentGroupId = groupId;
            await this.getListUsersByGroupId({
                groupId: this.currentGroupId
            });
            if (this.listUsersByGroup.length === 0) {
                this.$refs.deleteGroupModal.show();
            } else this.$toaster.error(this.$i18n.t('groups.errorDeleteGroupMess'));
        },
        resetForm() {
            this.groupInfo = {};
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
