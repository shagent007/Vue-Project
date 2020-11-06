<template>
    <div>
        <page-title
            :heading="getHeading"
            :subheading="subheading"
            :icon="icon"
            :actions="actions"
        ></page-title>
        <general-card v-model="model" />
        <users v-model="model" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import applicationFacade from "@/api/applicationFacade";
import { ArchitectStateDto, ValidationErrorDto } from "@/api/clients";
import { debounce } from "lodash";

import error from "@/pages/common/Error.vue";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import DeleteModal from "@/pages/common/DeleteModal.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import GeneralCard from "@/pages/catalog/ArchitectEditor/GeneralCard.vue";
import Users from "@/pages/catalog/ArchitectEditor/Users.vue";
import ActionButton from "@/pages/common/ActionButton.vue";

@Component({
    components: {
        error,
        PageTitle,
        GeneralCard,
        Users,
        ActionButton
    }
})
export default class Project extends Vue {
    model = new ArchitectStateDto();
    errors: ValidationErrorDto[] = [];

    heading: any = "";

    get subheading() {
        return " ";
    }

    get getHeading() {
        if (this.model.name) return this.model.name;
        return this.heading;
    }

    get actions() {
        return [];
    }

    icon = "pe-7s-home  icon-gradient bg-tempting-azure";

    get id() {
        return parseInt(this.$route.params.id);
    }

    async created() {
        this.model = await applicationFacade.architects.get(this.id);
        this.heading = this.model.name;
    }

    @Watch("model", {
        deep: true
    })
    onModelChange(value: ArchitectStateDto, oldValue: ArchitectStateDto) {
        if (oldValue && oldValue.id) {
            this.debouncedSave(this.model);
        }
    }

    debouncedSave = debounce(
        async (model: ArchitectStateDto) => {
            this.model = await applicationFacade.architects.save(model);
            this.heading = this.model.name;
        },
        800,
        { maxWait: 5000 }
    );
}
</script>
