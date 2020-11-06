<template>
  <v-select
    ref="select"
    label="name"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    @input="onChanged"
    :value="currentVal"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";
import { CollectionDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class CollectionSelect extends Vue {
  @Prop({ required: true }) value!: SearchProjectsCommand;
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Ref("select") readonly select!: any;
  items: Array<CollectionDto> = [];
  currentVal: any = 0;

  async created() {
    this.items = await applicationFacade.collections.getAll();

    if (this.value.collections) {
      this.currentVal =
        this.value.collections.length > 0 ? this.value.collections[0] : null;
    }
  }

  onChanged(value: number) {
    if (!value) {
      this.value.collections = [];
      return;
    }
    this.currentVal = value;
    this.value.collections = [];
    this.value.collections.push(value);
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>
