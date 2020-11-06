<template>
    <div>
        <page-title
            :heading="heading"
            :icon="icon"
            :actions="actions"
        ></page-title>
        <div class="row">
            <div class="col-md-12">
                <materials-list ref="list" :onEdit="onEdit" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import MaterialsList from "@/pages/catalog/Materials/MaterialsList.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { MaterialStateDto, MaterialDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import MaterialsEditor from "@/pages/catalog/Materials/MaterialsEditor.vue";
import { create } from "vue-modal-dialogs";

const confirmDialog = create<MaterialStateDto, boolean>(
    MaterialsEditor,
    "model"
);

@Component({
    components: {
        PageTitle,
        MaterialsList
    }
})
export default class OptionsView extends Vue {
    @Ref("list") readonly list!: MaterialsList;

    heading = "Каталог материалов";
    icon = "pe-7s-home  icon-gradient bg-tempting-azure";

    actions: PageTitleAction[] = [
        {
            text: "Добавить",
            icon: "plus",
            class: "btn-success",
            action: this.onAdd
        }
    ];

    async onAdd() {
        await confirmDialog(new MaterialStateDto());
        this.list.reload();
    }

    async onEdit(item: MaterialDto) {
        const material = await applicationFacade.materialsService.get(item.id);
        await confirmDialog(material);
        this.list.reload();
    }
}
</script>
