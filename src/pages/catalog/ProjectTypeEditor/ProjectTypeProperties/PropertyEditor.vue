<template>
    <div style="position: absolute; z-index: 1040;">
        <div class="modal fade show d-block">
            <div class="modal-dialog modal-lg">
                <div role="document" class="modal-content">
                    <header class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" aria-label="Close" class="close" @click="close">×</button>
                    </header>
                    <div class="modal-body">
                        <form>
                            <div class="position-relative row form-group">
                                <label for="sku" class="col-sm-2 col-form-label">Группа</label>
                                <div class="col-sm-10">
                                    <group-select
                                        :disabled="readonly"
                                        :items="groups"
                                        v-model="value.group"
                                    />
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label for="sku" class="col-sm-2 col-form-label">Тип данных</label>
                                <div class="col-sm-10">
                                    <property-type-select
                                        :disabled="readonly"
                                        v-model="value.type"
                                        @change="onTypeChange"/>
                                </div>
                            </div>

                            <div class="position-relative row form-group">
                                <label for="sku" class="col-sm-2 col-form-label">Редактор</label>
                                <div class="col-sm-10">
                                    <property-editor-select
                                        :disabled="readonly"
                                        :items="editors"
                                        v-model="value.editor"
                                    />
                                </div>
                            </div>

                            <div class="position-relative row form-group">
                                <label for="sku" class="col-sm-2 col-form-label">Код</label>
                                <div class="col-sm-10">
                                    <b-form-input :disabled="readonly" v-model="value.code"></b-form-input>
                                </div>
                            </div>

                            <div class="position-relative row form-group">
                                <label for="sku" class="col-sm-2 col-form-label">Название</label>
                                <div class="col-sm-10">
                                    <b-form-input v-model="value.name"></b-form-input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <footer class="modal-footer">
                        <b-button variant="secondary" @click="close">Омена</b-button>
                        <action-button class="btn-primary" :action="save">Сохранить</action-button>
                    </footer>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show" @click="close"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ActionButton from "@/pages/common/ActionButton.vue";
import {
    PropertyDto,
    PropertyGroupDto, PropertyTypeDto,
} from "@/api/clients";
import {Prop, Watch} from "vue-property-decorator";
import Error from "@/pages/common/Error.vue";

import GroupSelect from "@/pages/catalog/ProjectTypeEditor/ProjectTypeProperties/GroupSelect.vue";
import PropertyTypeSelect from "@/pages/catalog/ProjectTypeEditor/ProjectTypeProperties/PropertyTypeSelect.vue";
import PropertyEditorSelect from "@/pages/catalog/ProjectTypeEditor/ProjectTypeProperties/PropertyEditorSelect.vue";
import {DialogComponent} from "vue-modal-dialogs";

@Component({
    components: {
        ActionButton,
        Error,
        GroupSelect,
        PropertyTypeSelect,
        PropertyEditorSelect
    }
})
export default class PropertyEditor extends DialogComponent<PropertyDto | null> {
    @Prop() readonly model!: PropertyDto;
    @Prop() readonly groups!: PropertyGroupDto[];

    value: PropertyDto = new PropertyDto();

    created() {
        if(!this.model) {
            this.value = new PropertyDto({
                code: "",
                editor: "",
                group: "",
                name: "",
                type: ""
            });
        }
        else {
            this.value = PropertyDto.fromJS(this.model.toJSON());
        }
    }

    editors: string[] = [];

    get readonly() {
        return false;
    }

    get title() {
        return this.model ? "Редактирование свойства" : "Новое свойтво";
    }

    async save() {
        this.$close(this.value);
    }


    onTypeChange(value: PropertyTypeDto) {
        if(!value) {
            this.editors = [];
            this.value.type = undefined;
            this.value.editor = undefined;
            return;
        }

        this.value.type = value.code;
        this.editors = value.editors || [];

        if(this.editors.length > 0) {
            this.value.editor = this.editors[0];
        } else {
            this.value.editor = undefined;
        }
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
