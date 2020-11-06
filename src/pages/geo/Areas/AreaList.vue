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
            >
                <template v-slot:cell(actions)="data">
                    <button
                        @click="edit(data.item.id)"
                        class="border-0 btn-transition btn btn-outline-success"
                    >
                        <font-awesome-icon icon="edit" />
                    </button>
                    <button
                        @click="remove(data.item)"
                        class="border-0 btn-transition btn btn-outline-danger"
                    >
                        <font-awesome-icon icon="trash-alt" />
                    </button>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import { AreaDto } from "@/api/clients.ts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";

import { create } from "vue-modal-dialogs";

const confirmRemove = create<string, string, boolean>(
    ConfirmModal,
    "title",
    "message"
);
library.add(faEdit);

@Component({
    components: {
        "font-awesome-icon": FontAwesomeIcon,
        ConfirmModal
    }
})
export default class RegionList extends Vue {
    @Ref("table") readonly table!: BTable;
    @Prop({ required: true }) onEdit!: Function;

    areaToRemove = new AreaDto();
    showConfirmModal = false;

    fields = [
        {
            key: "order",
            label: "Порядок",
            sortable: true
        },
        {
            key: "name",
            label: "Название ",
            sortable: true
        },
        {
            key: "actions",
            label: ""
        }
    ];

    async itemsProvider() {
        try {
            return await applicationFacade.areas.getAll();
        } catch (e) {
            return [];
        }
    }

    async remove(item: AreaDto) {
        const result = await confirmRemove(
            "Внимание",
            "Вы действительно хотите удалить данный округ?"
        );
        if (!result) return;

        await applicationFacade.areas.remove(item.id);
        this.table.refresh();
    }

    edit(item: number) {
        this.onEdit(item);
    }

    public reload() {
        this.table.refresh();
    }
}
</script>
