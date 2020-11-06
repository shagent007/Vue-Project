<template>
    <b-card class="mt-2" title="Свойства">
        <b-button @click="onAddProperty" class="mb-2 btn-shadow" variant="primary">Добавить</b-button>

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
            <template v-slot:table-colgroup="scope">
                <col
                    v-for="field in scope.fields"
                    :key="field.key"
                    :style="{width: field.key === 'actions' ? '120px' : 'auto' }"
                />
            </template>

            <template v-slot:cell(group)="data">
                <div>{{ getGroup(data.item.group) }}</div>
            </template>

            <template v-slot:cell(type)="data">
                <div>{{ getPropertyType(data.item.type) }}</div>
            </template>

            <template v-slot:cell(actions)="data">
                <div style="text-align: center;">
                    <button
                        @click="onEditProperty(data.item)"
                        class="border-0 btn-transition btn btn-outline-success"
                    >
                        <font-awesome-icon icon="edit"/>
                    </button>
                    <button @click="remove(data.item)" class="border-0 btn-transition btn btn-outline-danger">
                        <font-awesome-icon icon="trash-alt"/>
                    </button>
                </div>
            </template>
        </b-table>
    </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
    ProjectTypeStateDto,
    PropertyDto,
    PropertyGroupDto,
    PropertyTypeDto,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import {Prop, Ref, Watch} from "vue-property-decorator";
import {BTable} from "bootstrap-vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {create} from "vue-modal-dialogs";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import PropertyEditor from "@/pages/catalog/ProjectTypeEditor/ProjectTypeProperties/PropertyEditor.vue";

const propertyEditor = create<
    PropertyDto | undefined,
    PropertyGroupDto[] | undefined,
    PropertyDto>(PropertyEditor, "model", "groups");

const confirmModal = create<string, string, boolean>(
    ConfirmModal,
    "title",
    "message"
);
library.add(faEdit);

@Component({
    components: {
        "font-awesome-icon": FontAwesomeIcon,
    },
})
export default class ProjectTypeProperties extends Vue {
    @Ref("table") readonly table!: BTable;
    @Prop({required: true, type: Object}) readonly value!: ProjectTypeStateDto;
    fields = [
        {
            key: "group",
            label: "Группа",
            sortable: true,
        },
        {
            key: "type",
            label: "Тип данных",
            sortable: true,
        },
        {
            key: "code",
            label: "Код",
            sortable: true,
        },
        {
            key: "name",
            label: "Название",
            sortable: true,
        },
        {
            key: "editor",
            label: "Редактор",
            sortable: true,
        },
        {
            key: "actions",
            label: "",
        },
    ];

    propertyTypes: Array<PropertyTypeDto> = [];

    async created() {
        this.propertyTypes = await applicationFacade.model.getPropertyTypes();
    }

    getGroup(code: string) {
        if (this.value.groups) {
            for (let index = 0; index < this.value.groups.length; index++) {
                if (this.value.groups[index].code === code)
                    return this.value.groups[index].name;
            }
        }
    }

    getPropertyType(code: string) {
        for (let index = 0; index < this.propertyTypes.length; index++) {
            if (this.propertyTypes[index].code === code)
                return this.propertyTypes[index].name;
        }
    }

    async itemsProvider() {
        return this.value.properties;
    }

        async onAddProperty() {
        const result = await propertyEditor(undefined, this.value.groups);

        if (this.value.properties && result) {
            this.value.properties.push(result);
            this.table.refresh();
        }
    }

    async onEditProperty(value: PropertyDto) {
        const result = await propertyEditor(value, this.value.groups);
        value.init(result);

        this.table.refresh();
    }

    async remove(item: PropertyDto) {
        const result = await confirmModal(
            "Внимание",
            "Вы действительно хотите удалить данную группу?"
        );
        if (!result) return;
        if (this.value.properties) {
            this.value.properties.splice(this.value.properties.indexOf(item), 1);

            this.table.refresh();
        }
    }
}
</script>
