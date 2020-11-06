<template>
    <div class="main-card mb-3 card">
        <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
        />
        <div class="card-body">
            <h5 class="card-title">Проекты</h5>
            <b-button
                class="mr-2 mb-2 btn-shadow"
                variant="primary"
                @click="onAdd()"
                >Добавить</b-button
            >
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
            >
                <template v-slot:cell(createdAt)="data">{{
                    data.value.toLocaleString("ru-RU")
                }}</template>
                <template v-slot:cell(state)="data">
                    <project-status :state="data.item.state"></project-status>
                </template>
                <template v-slot:cell(actions)="data">
                    <button
                        @click="remove(data.item.id)"
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
import VueElementLoading from "vue-element-loading";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Ref, Prop } from "vue-property-decorator";
import { BTable } from "bootstrap-vue";
import ProjectStatus from "@/pages/catalog/common/ProjectStatus.vue";
import { ProjectAnalogStateDto, ProjectAnalogDto } from "@/api/clients.ts";
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { create } from "vue-modal-dialogs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import AnalogProjectsModal from "@/pages/catalog/project/AnalogProjectsModal.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import CommentDialogue from "@/pages/catalog/project/CommentDialogue.vue";

const confirmRemove = create<string, string, boolean>(
    ConfirmModal,
    "title",
    "message"
);

const analogProjectsModal = create<Array<number>, number>(
    AnalogProjectsModal,
    "exludedId"
);

library.add(faEdit);
@Component({
    components: {
        ProjectStatus,
        AnalogProjectsModal,
        "font-awesome-icon": FontAwesomeIcon,
        VueElementLoading
    }
})
export default class AnalogProjectsList extends Vue {
    @Ref("table") readonly table!: BTable;
    @Prop({ type: Object }) value!: {
        id: number;
        projects: number[];
    };

    loading = false;
    searchProjectsCommand = new SearchProjectsCommand();
    isBusy = false;
    exludedId = new Array<number>();
    collection = new Array<number>();

    async remove(id: number) {
        const result = await confirmRemove(
            "Внимание",
            "Вы действительно хотите удалить данный проект из списка данной коллекции?"
        );
        if (!result) return;

        this.value.projects.splice(this.value.projects.indexOf(id), 1);
        this.table.refresh();
    }

    async itemsProvider(ctx: any, callback: any) {
        try {
            this.loading = true;
            if (!this.value) return [];

            const result = await applicationFacade.projectsService.search(
                this.searchProjectsCommand.projectTypeId,
                this.searchProjectsCommand.architectId,
                this.searchProjectsCommand.sku,
                this.searchProjectsCommand.from,
                this.searchProjectsCommand.to,
                this.searchProjectsCommand.state,
                this.searchProjectsCommand.collections,
                this.searchProjectsCommand.order,
                this.searchProjectsCommand.specification,
                this.searchProjectsCommand.pageNo,
                this.searchProjectsCommand.pageSize
            );

            return result.items;
        } catch (e) {
            return [];
        } finally {
            this.loading = false;
        }
    }

    created() {
        this.collection.push(this.value.id);

        this.searchProjectsCommand.collections = this.collection;
    }

    fields = [
        {
            key: "projectType",
            label: "Тип проекта",
            sortable: true
        },
        {
            key: "sku",
            label: "Код проекта",
            sortable: true
        },
        {
            key: "state",
            label: "Статус проекта"
        },
        {
            key: "architect",
            label: "Архитектор",
            sortable: true
        },
        {
            key: "name",
            label: "Название",
            sortable: true
        },
        {
            key: "price",
            label: "Цена",
            sortable: true
        },
        {
            key: "actions",
            label: ""
        }
    ];

    async onAdd() {
        const result = await analogProjectsModal(this.value.projects);

        this.value.projects.push(result);
        this.table.refresh();
    }

    public reload() {
        this.table.refresh();
    }
}
</script>
