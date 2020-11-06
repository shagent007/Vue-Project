<template>
  <b-form-select :value="selected" @change="onChange">
    <b-form-select-option
      v-for="item in items"
      :key="item.id"
      :value="item"
    >{{ getDate(item.created) }}</b-form-select-option>
  </b-form-select>
</template>

<script lang="ts">
import moment from "moment";
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { CategorySchemaDto } from "@/api/clients";

@Component
export default class CategorySchemaSelect extends Vue {
  selected: CategorySchemaDto | undefined = new CategorySchemaDto();
  items: Array<CategorySchemaDto> = [];

  getDate(date: Date) {
    return moment(date).format("DD-MM-YY hh:mm");
  }

  onChange(item: CategorySchemaDto) {
    this.selected = item;
    this.$emit("change", this.selected);
  }

  async created() {
    await this.reload();
  }

  async reload() {
    this.items = await applicationFacade.categories.getSchemas();
    this.selected = this.items.find((x) => x.isPublished);
    this.$emit("change", this.selected);
  }
}
</script>
