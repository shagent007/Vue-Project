<template>
    <div>
        <page-title
            :heading="heading"
            :icon="icon"
            :actions="actions"
        ></page-title>

        <collection-list />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CollectionStateDto } from "@/api/clients";
import { create } from "vue-modal-dialogs";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import CollectionList from "@/pages/catalog/Collections/CollectionList.vue";
import AddCollectionModal from "@/pages/catalog/Collections/AddCollectionModal.vue";

const addCollectionModal = create<CollectionStateDto, boolean>(
    AddCollectionModal,
    "model"
);

@Component({
    components: {
        CollectionList,
        PageTitle
    }
})
export default class Collections extends Vue {
    heading = "Коллекции";
    icon = "pe-7s-plane icon-gradient bg-tempting-azure";

    actions: PageTitleAction[] = [
        {
            text: "Добавить",
            icon: "plus",
            class: "btn-success",
            action: this.onAdd
        }
    ];

    async onAdd() {
        await addCollectionModal(new CollectionStateDto());
    }
}
</script>
