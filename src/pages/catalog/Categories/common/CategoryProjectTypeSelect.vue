<template>
  <v-select
    ref="select"
    label="projectType"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    :value="value"
    @input="update"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { CategorySchemaProjectTypeDto, CategorySchemaDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class CategoryCitySelect extends Vue {
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
  @Prop({ required: true }) readonly value!: number | null;
  @Prop({ type: Boolean }) readonly disabled!: boolean;

  items = new Array<CategorySchemaProjectTypeDto>();

  update(value: number | null) {
    this.$emit("change", value);
  }

  async created() {
    this.items = await applicationFacade.categories.getProjectTypes(
      this.schema.id
    );
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>
