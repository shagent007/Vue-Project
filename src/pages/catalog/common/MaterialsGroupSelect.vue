<template>
  <v-select
    ref="select"
    label="name"
    @blur="blur"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    v-model="value.groupId"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { MaterialGroupDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class MaterialsGroupSelect extends Vue {
  @Prop({ required: true }) value!: {
    groupId: number | null;
  };
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Ref("select") readonly select!: any;
  items: Array<MaterialGroupDto> = [];

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
    this.items = await applicationFacade.materialGroupsService.getAll();
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>
