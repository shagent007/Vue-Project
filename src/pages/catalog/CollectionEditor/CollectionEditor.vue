<template>
    <div>
        <page-title :heading="heading" :icon="icon"></page-title>

        <general v-model="model" class="mb-3" />
        <collection-project-list v-model="model" v-if="model.id" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { CollectionStateDto } from "@/api/clients";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import CollectionProjectList from "@/pages/catalog/CollectionEditor/CollectionProjectList.vue";
import General from "@/pages/catalog/CollectionEditor/General.vue";

@Component({
    components: {
        PageTitle,
        General,
        CollectionProjectList
    }
})
export default class CategoryEditor extends Vue {
    @Prop({ required: true, type: Number }) readonly id!: number;

    get heading() {
        return this.model.name ?? "";
    }

    icon = "pe-7s-plane icon-gradient bg-tempting-azure";
    model: CollectionStateDto = new CollectionStateDto();

    async created() {
        this.model = await applicationFacade.collections.get(this.id);
    }

    @Watch("model", {
        deep: true
    })
    async save(value: CollectionStateDto) {
        await applicationFacade.collections.save(value);
    }
}
</script>
