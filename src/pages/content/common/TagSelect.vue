<template>
  <v-select
    ref="select"
    label="name"
    :options="items"
    :reduce="items => items.value"
    v-model="value.tag"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { SearchTagCommand } from "@/api/content/SearchTagCommand.ts";
import { TagDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class ContentTagSelect extends Vue {
  @Prop({ required: true }) value!: {
    tag: string;
  };
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Prop({ default: false }) readonly filterConfig!: SearchTagCommand;
  @Ref("select") readonly select!: any;
  items: Array<TagDto> = [];

  async created() {
    const result = await applicationFacade.tags.search(
      this.filterConfig.name,
      this.filterConfig.dateFrom,
      this.filterConfig.dateTo,
      this.filterConfig.states,
      1,
      30
    );
    this.items = result.items ?? [];
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>







