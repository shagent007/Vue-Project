<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-12">
        <general v-model="model" />
        <aditional v-model="model" />
        <description v-model="model" />
        <seo :errors="errors" v-model="model" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { debounce } from "lodash";
import { Prop, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { TagStateDto, CategoryDto, PublishTagOptions } from "@/api/clients";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import { create } from "vue-modal-dialogs";

import General from "@/pages/content/TagEditor/General.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import Seo from "@/pages/common/editors/SeoCard.vue";
import Description from "@/pages/common/Description.vue";
import Aditional from "@/pages/common/Additional.vue";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

@Component({
  components: {
    PageTitle,
    General,
    Seo,
    Description,
    Aditional,
  },
})
export default class TagEditor extends Vue {
  @Prop({ required: true, type: Number }) readonly id!: number;

  get heading() {
    return this.model.name ?? "";
  }

  errors: { [name: string]: string } = {};
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  model: TagStateDto = new TagStateDto();

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
          action: this.remove,
        },
      ];
    if (this.model.state === 1)
      return [
        {
          text: "Удалить",
          class: "btn-danger",
          action: this.remove,
        },
      ];

    return [];
  }

  async remove() {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данный тег?"
    );
    if (!result) return;

    try {
      this.model = await applicationFacade.tags.delete(this.id);
    } catch (ex) {
      console.log(ex);
    }
  }

  get valid(): boolean {
    return true;
  }

  async created() {
    this.model = await applicationFacade.tags.getById(this.id);
  }

  @Watch("model", {
    deep: true,
  })
  async save(value: TagStateDto) {
    await applicationFacade.tags.save(value);
  }

  async publish() {
    this.model = await applicationFacade.tags.publish(
      this.id,
      new PublishTagOptions()
    );
  }
}
</script>
