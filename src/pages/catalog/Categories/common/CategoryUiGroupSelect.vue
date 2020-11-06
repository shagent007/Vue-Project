<template>
  <v-select
    ref="select"
    label="name"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    v-model="value.uiGroupId"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { CategorySchemaUiGroupDto, CategorySchemaDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class CategoryUiGroupSelect extends Vue {
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
  @Prop({ required: true }) readonly projectTypeId!: number;
  @Prop({ type: Boolean }) readonly disabled!: boolean;
  @Prop({ required: true }) value!: {
    uiGroupId: number | null;
  };

  items = new Array<CategorySchemaUiGroupDto>();

  async created() {
    this.items = await applicationFacade.categories.getUiGroups(
      this.schema.id,
      this.projectTypeId
    );
  }

  @Watch("projectTypeId")
  async onProjectTypeIdChanged(value: number) {
    console.log(value);
    this.items = await applicationFacade.categories.getUiGroups(
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

