<template>
    <div class="main-card mb-3 card">
        <div class="card-body">
            <b-table
                ref="table"
                class="align-middle mb-0"
                borderless
                striped
                hover
                primary-key="id"
                :items="itemsProvider"
                :fields="fields"
                :busy.sync="isBusy"
                :per-page="pagination.perPage"
                :current-page="pagination.currentPage"
            >
                <template v-slot:cell(actions)="data">
                    <div style="text-align: center;">
                        <button
                            @click="edit(data.item.id)"
                            class="border-0 btn-transition btn btn-outline-primary"
                        >
                            <font-awesome-icon icon="edit" />
                        </button>
                        <button
                            @click="remove(data.item.id)"
                            class="border-0 btn-transition btn btn-outline-danger"
                        >
                            <font-awesome-icon icon="trash-alt" />
                        </button>
                    </div>
                </template>
            </b-table>
        </div>

        <div
            class="d-block text-center card-footer"
            v-show="pagination.visible"
        >
            <b-pagination
                class="mb-0 pl-0"
                v-model="pagination.currentPage"
                :total-rows="pagination.totalRows"
                :per-page="pagination.perPage"
            ></b-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Ref, Watch } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import { create } from "vue-modal-dialogs";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);

const confirmModal = create<string, string, boolean>(
    ConfirmModal,
    "title",
    "message"
);

@Component({
    components: {
        "font-awesome-icon": FontAwesomeIcon
    }
})
export default class PageList extends Vue {
    @Ref("table") readonly table!: BTable;

    pagination = {
        currentPage: 1,
        perPage: 30,
        totalRows: 0,
        visible: false
    };

    isBusy = false;

    fields = [
        {
            key: "name",
            label: "Название",
            sortable: true
        },
        {
            key: "code",
            label: "Код",
            sortable: true
        },
        {
            key: "actions",
            label: ""
        }
    ];

    async itemsProvider() {
        this.isBusy = true;
        try {
            return await applicationFacade.collections.getAll();
        } catch (e) {
            this.isBusy = false;
            return [];
        }
    }

    @Watch("pagination.currentPage")
    async onPageChange() {
        this.table.refresh();
    }

    edit(postId: string): void {
        this.$router.push({
            name: "collection-page-id",
            params: { id: postId }
        });
    }

    async remove(id: number) {
        const result = await confirmModal(
            "Внимание",
            "Вы действительно хотите удалить данную коллекцию?"
        );
        if (!result) return;

        await applicationFacade.collections.delete(id);
        this.table.refresh();
    }
}
</script>
