<template>
  <b-card class="mt-3">
    <div class="position-relative row form-group">
      <label for="name" class="col-sm-2 col-form-label">Короткое название</label>
      <div class="col-sm-10">
        <b-form-input v-model="value.shortName" placeholder="Введите название"></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="name" class="col-sm-2 col-form-label">Короткое описание</label>
      <div class="col-sm-10">
        <b-form-input v-model="value.shortDescription" placeholder="Введите название"></b-form-input>
      </div>
    </div>
  </b-card>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { PostStateDto } from "@/api/clients";

@Component
export default class Additional extends Vue {
  @Prop({ required: true, type: Object }) readonly value!: PostStateDto;

  get valid(): boolean {
    return true;
  }
}
</script>