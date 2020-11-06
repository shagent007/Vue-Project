<template>
  <div v-if="errorMessage.length > 0" class="error">
    <div class="mb-3 card text-white card-body bg-danger">
      <h5 class="text-white card-title">Необходимо исправить следующие ошибки</h5>
      <p v-for="(item, index) in errorMessage" :key="index">{{ item.message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import { ValidationErrorDto } from "@/api/clients";

@Component
export default class Error extends Vue {
  @Prop({ type: Array }) readonly errorMessage!: ValidationErrorDto[];

  @Watch("errorMessage")
  onChange(value: Array<ValidationErrorDto>) {
    console.log(value);
  }
}
</script>
