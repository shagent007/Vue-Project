<template>
  <v-select
    :value="value"
    @input="onChanged"
    label="name"
    :reduce="item => item.code"
    :options="items"
    :disabled="disabled"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { PropertyTypeDto } from "@/api/clients";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect
  }
})
export default class PropertyTypeSelect extends Vue {
  @Prop({ required: true }) readonly value!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;

  items: Array<PropertyTypeDto> = [];

  async created() {
    this.items = await applicationFacade.model.getPropertyTypes();
    if(this.value) {
        const item = this.items.find(x => x.code == this.value);
        this.$emit("change", item);
    }
  }

  onChanged(value: string) {
    const item = this.items.find(x => x.code == value);
    this.$emit("input", value);
    this.$emit("change", item);
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>

