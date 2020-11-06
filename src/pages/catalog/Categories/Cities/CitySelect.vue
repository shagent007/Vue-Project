<template>
  <v-select
    ref="select"
    label="name"
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
import { CityDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class CitySelect extends Vue {
  @Prop({ required: true }) value!: {
    cityId: number | null;
  };
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  items: Array<CityDto> = [];

  async created() {
    this.items = await applicationFacade.cities.getAll(null);
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>

