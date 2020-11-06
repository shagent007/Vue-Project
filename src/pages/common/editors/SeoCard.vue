<template  v-show="value">
  <div class="main-card mb-3 card">
    <div class="card-body">
      <h5 class="card-title">SEO</h5>
      <form>
        <div class="position-relative row form-group">
          <label for="url" class="col-sm-2 col-form-label">Url</label>
          <div class="col-sm-10">
            <b-form-input
              :disabled="true"
              id="url"
              class="form-control"
              :value="value.url"
              @change="onUrlChanged"
              :state="errors.url && !errors.url"
            ></b-form-input>
            <b-form-invalid-feedback>{{errors.url}}</b-form-invalid-feedback>
          </div>
        </div>
        <div class="position-relative row form-group">
          <label for="title" class="col-sm-2 col-form-label">Title</label>
          <div class="col-sm-10">
            <b-form-input
              id="title"
              class="form-control"
              :value="value.title"
              @change="onTitleChanged"
              :state="errors.title && !errors.title"
            ></b-form-input>
            <b-form-invalid-feedback>{{errors.title}}</b-form-invalid-feedback>
          </div>
        </div>
        <div class="position-relative row form-group">
          <label for="metaDescription" class="col-sm-2 col-form-label">Meta Description</label>
          <div class="col-sm-10">
            <b-form-textarea
              id="metaDescription"
              :value="value.metaDescription"
              @change="onMetaDescriptionChanged"
              :state="errors.metaDescription && !errors.metaDescription"
              class="form-control"
            ></b-form-textarea>
            <b-form-invalid-feedback>{{errors.metaDescription}}</b-form-invalid-feedback>
          </div>
        </div>

        <div class="position-relative row form-group">
          <label for="metaKeywords" class="col-sm-2 col-form-label">Meta Keywords</label>
          <div class="col-sm-10">
            <b-form-input
              id="metaKeywords"
              :value="value.metaKeywords"
              @change="onMetaKeywordsChanged"
              :state="errors.metaKeywords && !errors.metaKeywords"
              class="form-control"
            ></b-form-input>
            <b-form-invalid-feedback>{{errors.metaKeywords}}</b-form-invalid-feedback>
          </div>
        </div>

        <div class="position-relative row form-group">
          <label for="navLinkTitle" class="col-sm-2 col-form-label">Элемент меню, подсказка</label>
          <div class="col-sm-10">
            <b-form-input
              id="navLinkTitle"
              :value="value.navLinkTitle"
              @change="onNavLinkTitleChanged"
              :state="errors.navLinkTitle && !errors.navLinkTitle"
              class="form-control"
            ></b-form-input>
            <b-form-invalid-feedback>{{errors.navLinkTitle}}</b-form-invalid-feedback>
          </div>
        </div>

        <div class="position-relative row form-group">
          <label for="navLinkText" class="col-sm-2 col-form-label">Элемент меню, текст</label>
          <div class="col-sm-10">
            <b-form-input
              id="navLinkText"
              :value="value.navLinkText"
              @change="onNavLinkTextChanged"
              :state="errors.navLinkText && !errors.navLinkText"
              class="form-control"
            ></b-form-input>
            <b-form-invalid-feedback>{{errors.navLinkText}}</b-form-invalid-feedback>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop, Watch } from "vue-property-decorator";

@Component
export default class SeoCard extends Vue {
  @Prop({ type: Object }) readonly value!: {
    url?: string;
    title?: string;
    metaKeywords?: string;
    metaDescription?: string;
    navLinkTitle?: string;
    navLinkText?: string;
  };
  @Prop({ required: true, type: Object }) readonly errors!: {
    [name: string]: string;
  };

  onUrlChanged(value: string) {
    this.value.url = value;
  }
  onTitleChanged(value: string) {
    this.value.title = value;
  }
  onMetaDescriptionChanged(value: string) {
    this.value.metaKeywords = value;
  }
  onMetaKeywordsChanged(value: string) {
    this.value.metaDescription = value;
  }
  onNavLinkTitleChanged(value: string) {
    this.value.navLinkTitle = value;
  }
  onNavLinkTextChanged(value: string) {
    this.value.navLinkText = value;
  }
}
</script>

