<template>
  <b-card class="mb-3">
    <form>
      <div class="row">
        <div class="col-md-3">
          <main-image
            v-model="value.image"
            :folder="imageFolder"
            imageId="CategoryMainImage"
            @update="onImageUpdate($event)"
          />
        </div>

        <div class="col-md-9">
          <div class="position-relative row form-group">
            <label for="name" class="col-sm-2 col-form-label">Название</label>
            <div class="col-sm-10">
              <b-form-input
                :value="value.shortName"
                @change="onChange"
                placeholder="Введите название"
              ></b-form-input>
            </div>
          </div>

          <div class="position-relative row form-group">
            <label for="name" class="col-sm-2 col-form-label">Статус</label>
            <div class="col-sm-10">
              <category-status :state="value.state" />
            </div>
          </div>

          <div class="position-relative row form-group">
            <label for="category" class="col-sm-2 col-form-label">Родитель</label>
            <div class="col-sm-10">
              <page-parent-select
                :disabled="true"
                v-model="value.parentId"
                :filterConfig="newFilterConfig"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { PageStateDto, ImageDto } from "@/api/clients";
import { SearchPageCommand } from "@/api/site/SearchPageCommand.ts";

import CategoryStatus from "@/pages/content/Categories/CategoryStatus.vue";
import PageParentSelect from "@/pages/site/common/PageParentSelect.vue";
import MainImage from "@/pages/common/MainImage.vue";

@Component({
  components: {
    CategoryStatus,
    PageParentSelect,
    MainImage,
  },
})
export default class General extends Vue {
  @Prop({ required: true, type: Object }) readonly value!: PageStateDto;
  newFilterConfig = new SearchPageCommand();

  created() {
    this.newFilterConfig.states = [0, 1, 2];
  }

  onChange(value: string | undefined) {
    this.value.shortName = value;
  }

  get imageFolder() {
    return `site/pages/${this.value.id}`;
  }
  onImageUpdate(event: ImageDto | undefined) {
    this.value.image = event;
  }
}
</script>
