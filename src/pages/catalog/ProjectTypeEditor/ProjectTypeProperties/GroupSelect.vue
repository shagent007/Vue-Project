<template>
  <v-select
    label="name"
    :value="value"
    @input="onChanged"
    :options="items"
    :reduce="item => item.code"
    :disabled="disabled"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { PropertyGroupDto } from "@/api/clients";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect
  }
})
export default class PropertyGroupSelect extends Vue {
  @Prop({ required: true }) readonly value!: string;
  @Prop({ required: true }) readonly items!: PropertyGroupDto[];
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;

  onChanged(value: string) {
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