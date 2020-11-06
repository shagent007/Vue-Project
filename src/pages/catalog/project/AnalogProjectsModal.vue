<template>
    <div style="position: absolute; z-index: 1040;">
        <div class="modal fade show d-block">
            <div class="modal-dialog modal-xl">
                <div role="document" class="modal-content">
                    <header class="modal-header">
                        <h5 class="modal-title">Добавить похожий проект</h5>
                        <button
                            type="button"
                            aria-label="Close"
                            class="close"
                            @click="close"
                        >
                            ×
                        </button>
                    </header>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-9">
                                    <project-list
                                        @onAdd="select($event)"
                                        buttonType="Выбрать"
                                        ref="list"
                                        v-model="searchProjectsCommand"
                                        :exludedId="exludedId"
                                    />
                                </div>
                                <div class="col-md-3">
                                    <projects-filter
                                        v-model="searchProjectsCommand"
                                    ></projects-filter>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show" @click="close"></div>
    </div>
</template>

<script lang="ts">
import { DialogComponent } from "vue-modal-dialogs";
import Component from "vue-class-component";
import ActionButton from "@/pages/common/ActionButton.vue";

import ProjectList from "@/pages/catalog/projects/ProjectList.vue";
import ProjectsFilter from "@/pages/catalog/projects/ProjectsFilter.vue";
import { Ref, Watch, Prop } from "vue-property-decorator";
import { ProjectState } from "@/api/clients.ts";
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";

@Component({
    components: {
        ActionButton,
        ProjectList,
        ProjectsFilter
    }
})
export default class AnalogProjectsModal extends DialogComponent<
    number | null
> {
    @Ref("list") readonly list!: ProjectList;
    @Prop({ required: true, type: Array }) readonly exludedId!: Array<number>;

    searchProjectsCommand = new SearchProjectsCommand();

    select(event: number) {
        this.$close(event);
    }

    @Watch("searchProjectsCommand", {
        deep: true
    })
    async onfilterChange(value: any) {
        this.list.reload();
    }

    close() {
        this.$close(null);
    }
}
</script>

<style scoped>
.modal {
    overflow: auto;
}
</style>
