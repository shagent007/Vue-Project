<template>
  <div v-if="model">
    <page-title :heading="heading" :subheading="subheading" :icon="icon" :actions="actions"></page-title>
    <div v-if="isSuccess" class="mb-3 card text-white card-body bg-success">
      <h5 class="text-white card-title">Проект успешно опубликован</h5>
    </div>

    <div class="content">
      <general-card v-model="model" :errors="errors" />
      <group-card v-model="model" />
      <image-card
        id="images"
        :folder="getFolder(model.sku, 'images')"
        title="Изображения"
        v-model="model.images"
        @onChange="model.images = $event"
      ></image-card>
      <image-card
        id="plans"
        :folder="getFolder(model.sku, 'plans')"
        title="Планы"
        v-model="model.plans"
        @onChange="model.plans = $event"
      ></image-card>
      <image-card
        id="facades"
        :folder="getFolder(model.sku, 'facades')"
        title="Фасады"
        v-model="model.facades"
        @onChange="model.facades = $event"
      ></image-card>

      <bundles-card ref="bundles" v-model="model"></bundles-card>
      <analog-projects ref="analogs" v-model="model"></analog-projects>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import camelcase from "lodash/camelCase";
import Component from "vue-class-component";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import GeneralCard from "@/pages/catalog/project/GeneralCard.vue";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import {
  ProjectStateDto,
  ProjectTypeStateDto,
  ValidationErrorDto,
} from "@/api/clients";
import ImageCard from "@/pages/catalog/project/ImageCard.vue";
import BundlesCard from "@/pages/catalog/project/BundlesCard.vue";
import { debounce } from "lodash";
import error from "@/pages/common/Error.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import AnalogProjects from "@/pages/catalog/project/AnalogProjects.vue";
import GroupCard from "@/pages/catalog/project/GroupCard.vue";
import { create } from "vue-modal-dialogs";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

@Component({
  components: {
    PageTitle,
    GeneralCard,
    ImageCard,
    BundlesCard,
    error,
    AnalogProjects,
    GroupCard,
  },
})
export default class Project extends Vue {
  @Prop({ required: true, type: Number }) readonly id!: number;
  @Ref("bundles") readonly bundlesCard!: BundlesCard;
  @Ref("analogs") readonly analogs!: AnalogProjects;

  model = new ProjectStateDto();
  errors: { [name: string]: string } = {};
  isSuccess = false;
  projectType = new ProjectTypeStateDto();
  get heading() {
    return "Проект " + this.model.sku;
  }

  get subheading() {
      if(!this.model.attributes)
          return '';

     return this.model.attributes.Name;
  }

  get actions() {
    if (this.model.state === 0)
      return [
        {
          text: "Опубликовать",
          class: "btn-success",
          action: this.publish,
        },
        {
          text: "Удалить",
          class: "btn-danger",
          action: this.deleteProject,
        },
      ];
    else if (this.model.state === 1)
      return [
        {
          text: "Удалить",
          class: "btn-danger",
          action: this.deleteProject,
        },
      ];
    else return [];
  }

  getFolder(sku: string, imageType: string) {
    return `catalog/projects/${sku}/${imageType}`;
  }

  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  async created() {
    this.model = await applicationFacade.projectsService.get(this.id);
  }

  @Watch("model", {
    deep: true,
  })
  onModelChange(value: ProjectStateDto, oldValue: ProjectStateDto) {
    if (oldValue && oldValue.id) {
      this.debouncedSave(this.model, this.bundlesCard, this.analogs);
    } else {
      this.bundlesCard.reload();
      this.analogs.reload();
    }
  }

  debouncedSave = debounce(
    async (
      model: ProjectStateDto,
      bundlesCard: BundlesCard,
      analogs: AnalogProjects
    ) => {
      await applicationFacade.projectsService.update(model);
      //model.init(data);
      bundlesCard.reload();
      analogs.reload();
    },
    800,
    { maxWait: 5000 }
  );

  async publish() {
    this.errors = {};
    try {
      this.model = await applicationFacade.projectsService.publish(
        this.model.id
      );
      this.isSuccess = true;
    } catch (ex) {
      this.errors = Object.fromEntries(
        ex.errors.map((x: ValidationErrorDto) => [
          camelcase(x.fieldName),
          x.message,
        ])
      );
      this.isSuccess = false;
    }
  }

  async deleteProject() {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данный проект?"
    );
    if (!result) return;

    try {
      this.model = await applicationFacade.projectsService.remove(
        this.model.id
      );
    } catch (ex) {
      console.log(ex);
    }
  }
}
</script>


