<template>
    <div style="position: absolute; z-index: 1040;">
        <div class="modal fade show d-block">
            <div class="modal-dialog modal-lg">
                <div role="document" class="modal-content">
                    <header class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button
                            type="button"
                            aria-label="Close"
                            class="close"
                            @click="decline"
                        >
                            ×
                        </button>
                    </header>
                    <div class="modal-body">
                        <error :errorMessage="errors" />
                        <form class>
                            <div class="position-relative row form-group">
                                <label for="sku" class="col-sm-2 col-form-label"
                                    >Название</label
                                >
                                <div class="col-sm-10">
                                    <b-form-input
                                        v-model="value.name"
                                        class="form-control"
                                    ></b-form-input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <footer class="modal-footer">
                        <b-button variant="secondary" @click="decline"
                            >Омена</b-button
                        >
                        <action-button className="btn-primary" :action="submit"
                            >Сохранить</action-button
                        >
                    </footer>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show" @click="decline"></div>
    </div>
</template>

<script lang="ts">
import { DialogComponent } from "vue-modal-dialogs";
import Component from "vue-class-component";
import ActionButton from "@/pages/common/ActionButton.vue";

import { ProjectTypeStateDto, ValidationErrorDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref } from "vue-property-decorator";
import Error from "@/pages/common/Error.vue";
import SeoCard from "@/pages/common/editors/SeoCard.vue";

@Component({
    components: {
        ActionButton,
        Error,
        SeoCard
    }
})
export default class ProjectTypeEditor extends DialogComponent<boolean> {
    @Prop({ required: true, type: Object })
    readonly value!: ProjectTypeStateDto;

    errors: ValidationErrorDto[] = [];

    get title() {
        return !this.value.id
            ? "Новый тип проекта"
            : "Редактирование типа проекта";
    }

    async submit() {
        try {
            await applicationFacade.projectTypes.save(this.value);
            this.$close(true);
        } catch (er) {
            this.errors = er.errors;
        }
    }

    decline() {
        this.$close(false);
    }
}
</script>

<style scoped>
.modal {
    overflow: auto;
}
</style>
