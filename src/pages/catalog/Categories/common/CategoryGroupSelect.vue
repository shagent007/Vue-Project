<template>
  <v-select
    ref="select"
    label="name"
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
import { CategorySchemaGroupDto, CategorySchemaDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class CategoryGroupSelect extends Vue {
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
  @Prop({ required: false, type: Number }) readonly projectTypeId!: number;
  @Prop({ required: true }) value!: {
    groupId: number | null;
  };
  @Prop({ type: Boolean }) readonly disabled!: boolean;

  items = new Array<CategorySchemaGroupDto>();

  async created() {
    this.items = await applicationFacade.categories.getGroups(
      this.schema.id,
      this.projectTypeId
    );
  }

  @Watch("projectTypeId")
  async onProjectTypeIdChanged(value: number, oldValue: number) {
    this.items = await applicationFacade.categories.getGroups(
      this.schema.id,
      value
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

