<template>
  <div>
    <page-title :heading="heading" :icon="icon"></page-title>

    <general-card v-if="model.id" v-model="model"></general-card>
    <groups v-if="model.id" v-model="model.groups" />
    <properties v-if="model.id" v-model="model" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import { Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import {
  ProjectTypeStateDto,
  ValidationErrorDto,
  PropertyGroupDto,
} from "@/api/clients";
import error from "@/pages/common/Error.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import { debounce } from "lodash";
import GeneralCard from "@/pages/catalog/ProjectTypeEditor/GeneralCard.vue";
import Groups from "@/pages/catalog/ProjectTypeEditor/Groups.vue";
import Properties from "@/pages/catalog/ProjectTypeEditor/ProjectTypeProperties/Properties.vue";
import { create } from "vue-modal-dialogs";

@Component({
  components: {
    error,
    PageTitle,
    GeneralCard,
    Groups,
    Properties,
  },
})
export default class ProjectTypeEditor extends Vue {
  model = new ProjectTypeStateDto();
  errors: ValidationErrorDto[] = [];

  get heading() {
    return this.model.name ?? "";
  }

  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  get id() {
    return parseInt(this.$route.params.id);
  }

  async created() {
    this.model = await applicationFacade.projectTypes.get(this.id);
  }

  @Watch("model", {
    deep: true,
  })
  onModelChange(value: ProjectTypeStateDto, oldValue: ProjectTypeStateDto) {
    if (oldValue && oldValue.id) {
      this.debouncedSave(this.model);
    }
  }

  debouncedSave = debounce(
    async (model: ProjectTypeStateDto) => {
      this.model = await applicationFacade.projectTypes.save(model);
    },
    800,
    { maxWait: 5000 }
  );
}
</script>
