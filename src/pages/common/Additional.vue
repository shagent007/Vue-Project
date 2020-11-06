<template>
  <b-card class="mt-3">
    <div class="position-relative row form-group">
      <label for="name" class="col-sm-2 col-form-label">Полное название</label>
      <div class="col-sm-10">
        <b-form-input :value="value.name" @change="onChangeName" placeholder="Введите название"></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="name" class="col-sm-2 col-form-label">Короткое описание</label>
      <div class="col-sm-10">
        <html-editor :value="value.shortDescription" v-model="value.shortDescription"></html-editor>
      </div>
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import HtmlEditor from "@/pages/common/HtmlEditor.vue";

@Component({
  components: {
    HtmlEditor,
  },
})
export default class Additional extends Vue {
  @Prop({ required: true, type: Object }) readonly value!: any;

  onChangeName(value: string | undefined) {
    this.value.name = value;
  }
}
</script>
