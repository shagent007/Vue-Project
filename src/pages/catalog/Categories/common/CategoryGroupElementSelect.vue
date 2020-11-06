<template>
  <div class="position-relative row form-group">
    <label for="sku" class="col-sm-2 col-form-label mt-2">{{model.name}}</label>
    <div class="col-sm-10">
      <category-element-select
        :groupId="model.id"
        :schema="schema"
        :projectTypeId="projectTypeId"
        :elements="elements"
        @elementUpdate="up($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  CategorySchemaElementStateDto,
  CategorySchemaGroupDto,
  CategorySchemaDto,
} from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";

import CategoryElementSelect from "@/pages/catalog/Categories/common/CategoryElementSelect.vue";

@Component({
  components: {
    CategoryElementSelect,
  },
})
export default class CategoryGroupElementSelect extends Vue {
  @Prop({ required: true }) readonly model!: CategorySchemaGroupDto;
  @Prop({ required: true }) readonly projectTypeId!: number;
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
  @Prop({ required: true }) readonly elements!: Array<number>;

  up(event: any) {
    if (event.cur === null) event.cur = -1;
    this.$emit("updateEl", event);
  }
}
</script>
