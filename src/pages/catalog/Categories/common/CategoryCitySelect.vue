<template>
  <v-select
    ref="select"
    label="city"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    v-model="value.cityId"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { CategorySchemaCityDto, CategorySchemaDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class CategoryCitySelect extends Vue {
  @Prop({ required: true }) value!: {
    cityId: number | null;
  };
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Ref("select") readonly select!: any;
  items: Array<CategorySchemaCityDto> = [];

  async created() {
    this.items = await applicationFacade.categories.getCities(this.schema.id);
  }

  @Watch("schema")
  async onSchemaChanged(value: CategorySchemaDto) {
    this.items = await applicationFacade.categories.getCities(value.id);
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>
