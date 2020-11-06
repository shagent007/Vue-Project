<template v-show="value">
  <div class="main-card mb-2 card">
    <div class="card-body">
      <h5 class="card-title">Общая информация</h5>
      <form class="pb-4">
        <div class="row">
          <div class="col-sm-4 pb-6">
            <main-image
              v-model="value.mainImage"
              :folder="imageFolder"
              imageId="ProjectMainImage"
              @update="onImageUpdate($event)"
            />
          </div>
          <div class="col-sm-8">
            <div class="position-relative row form-group">
              <div class="col-sm-2">Статус проекта</div>
              <div class="col-sm-10">
                <project-status :state="value.state"></project-status>
              </div>
            </div>

            <div class="position-relative row form-group">
              <label for="projectTypeId" class="col-sm-2 col-form-label">Тип проекта</label>
              <div class="col-sm-10">
                <project-type-select :disabled="true" v-model="value"></project-type-select>
              </div>
            </div>

            <div class="position-relative row form-group">
              <label for="sku" class="col-sm-2 col-form-label">Код проекта</label>
              <div class="col-sm-10">
                <b-form-input class="form-control" v-model="value.sku"></b-form-input>
              </div>
            </div>

            <div class="position-relative row form-group">
              <label for="architectId" class="col-sm-2 col-form-label">Архитектор</label>
              <div class="col-sm-10">
                <architect-select v-model="value"></architect-select>
              </div>
            </div>

            <div class="position-relative row form-group">
              <label for="sku" class="col-sm-2 col-form-label">Цена</label>
              <div class="col-sm-10">
                <b-form-input
                  :min="1"
                  class="form-control"
                  :disabled="true"
                  type="number"
                  v-model.number="value.attributes.Price"
                ></b-form-input>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { ImageDto } from "@/api/clients";

import HtmlEditor from "@/pages/common/HtmlEditor.vue";
import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";
import ArchitectSelect from "@/pages/catalog/common/ArchitextSelect.vue";
import ProjectStatus from "@/pages/catalog/common/ProjectStatus.vue";
import MainImage from "@/pages/common/MainImage.vue";

@Component({
  components: {
    HtmlEditor,
    ProjectTypeSelect,
    ArchitectSelect,
    ProjectStatus,
    MainImage,
  },
})
export default class GeneralCard extends Vue {
  @Prop({ type: Object }) readonly value!: {
    state?: number;
    projectTypeId?: number;
    architectId?: number;
    sku?: string;
    mainImage: ImageDto | null;
    attributes: any;
  };

  get imageFolder() {
    return `catalog/projects/${this.value.sku}`;
  }

  onImageUpdate(event: ImageDto | null) {
    this.value.mainImage = event;
  }
}
</script>
