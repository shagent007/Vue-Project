<template>
  <v-select
    ref="select"
    label="name"
    @input="onChanged"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    :value="value"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { CategoryDto } from "@/api/clients";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class ContentCategorySelect extends Vue {
  @Prop({ required: true }) readonly value!: number | null;
  @Prop({ required: true }) readonly filterConfig!: SearchCategoryCommand;
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Ref("select") readonly select!: any;

  items: Array<CategoryDto> = [];

  async created() {
    const result = await applicationFacade.contentCategories.search(
      this.filterConfig.parentId,
      this.filterConfig.name,
      this.filterConfig.dateFrom,
      this.filterConfig.dateTo,
      this.filterConfig.states,
      1,
      30
    );
    this.items = result.items ?? [];
  }

  onChanged(value: number | null) {
    this.$emit("input", value);
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>

