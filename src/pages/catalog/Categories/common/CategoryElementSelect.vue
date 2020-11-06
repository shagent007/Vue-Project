<template>
  <v-select
    ref="select"
    label="slug"
    :options="items"
    :reduce="items => items.id"
    :disabled="disabled"
    v-model="value"
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { CategorySchemaElementDto, CategorySchemaDto } from "@/api/clients";
import vSelect from "vue-select";
@Component({
  components: {
    vSelect,
  },
})
export default class CategoryCitySelect extends Vue {
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
  @Prop({ required: true }) readonly projectTypeId!: number;
  @Prop({ required: true }) readonly groupId!: number;
  @Prop({ required: true }) readonly elements!: Array<number>;
  @Prop({ type: Boolean }) readonly disabled!: boolean;

  items: Array<CategorySchemaElementDto> = [];
  null = new CategorySchemaElementDto();
  value: any = -1;

  @Watch("value")
  async onValueChanged(value: number, oldValue: number) {
    this.$emit("elementUpdate", {
      old: oldValue,
      cur: value,
    });
  }

  async getElements(schemaId: number, projectTypeId: number, groupId: number) {
    const items = await applicationFacade.categories.getElements(
      schemaId,
      projectTypeId
    );

    this.items = items.filter((element) => element.groupId === groupId);
    this.null.id = -1;
    this.null.slug = "";
    this.items.unshift(this.null);

    for (let index = 0; index < this.items.length; index++) {
      if (this.elements?.find((x) => x == this.items[index].id) != undefined) {
        this.value = this.elements?.find((x) => x == this.items[index].id);
        break;
      }
    }

    return items;
  }

  async created() {
    await this.getElements(this.schema.id, this.projectTypeId, this.groupId);
  }

  @Watch("schema")
  async onSchemaChanged(schema: CategorySchemaDto) {
    await this.getElements(schema.id, this.projectTypeId, this.groupId);
  }

  @Watch("projectTypeId")
  async onProjectTypeIdChanged(projectTypeId: number) {
    await this.getElements(this.schema.id, projectTypeId, this.groupId);
  }

  @Watch("groupId")
  async onGroupIdChanged(groupId: number) {
    await this.getElements(this.schema.id, this.projectTypeId, groupId);
  }
}
</script>


<style>
.v-application ul,
.v-application ol {
  padding: 0px !important;
}
</style>
