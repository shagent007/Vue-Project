<template>
  <v-select
    ref="select"
    label="name"
    @blur="blur"
    :options="items"
    :reduce="items => items.id"
    v-model="value.areaId"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { AreaDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class AreaSelect extends Vue {
  @Prop({ required: true }) value!: {
    areaId: number | null;
  };
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Ref("select") readonly select!: any;
  items: Array<AreaDto> = [];

  public setFocus() {
    this.$nextTick(() => {
      this.select.onSearchFocus();
      this.select.$el.children[0].children[0].children[1].focus();
    });
  }

  blur() {
    this.select.onSearchBlur();
  }

  async created() {
    this.items = await applicationFacade.areas.getAll();
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>







