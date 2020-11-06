<template>
  <v-select
    ref="select"
    label="name"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    v-model="parentId"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { PageDto } from "@/api/clients";
import { SearchPageCommand } from "@/api/site/SearchPageCommand.ts";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class ContentCategorySelect extends Vue {
  @Prop({ required: true }) readonly value!: number | null;
  @Prop({ required: true }) readonly filterConfig!: SearchPageCommand;
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Ref("select") readonly select!: any;

  items: Array<PageDto> = [];

  async created() {
    const result = await applicationFacade.pages.search(
      null,
      this.filterConfig.name,
      this.filterConfig.dateFrom,
      this.filterConfig.dateTo,
      this.filterConfig.states,
      1,
      30
    );
    this.items = result.items ?? [];
  }

  get parentId() {
    return this.value;
  }

  set parentId(value: number | null) {
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

