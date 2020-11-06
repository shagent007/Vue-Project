<template>
  <v-select
    ref="select"
    label="name"
    @blur="blur"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    v-model="value.projectTypeId"
    @change="$emit('change')"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { projectTypeModule } from "@/store/modules/projectTypes.ts";
import { ProjectTypeDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class ProjectTypeSelect extends Vue {
  @Prop({ required: true }) value!: {
    projectTypeId: number | null;
  };
  @Prop({ type: Boolean, default: false }) readonly disabled?: boolean;
  @Ref("select") readonly select!: any;
  items: Array<ProjectTypeDto> = [];

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
    await projectTypeModule.getAllProjectTypes();
    this.items = projectTypeModule.getProjectTypes;
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>
