<template>
  <td @focusout="isEdit = false;" @click="changeState">
    <div v-show="isEdit === false">{{ getProjectTypes }}</div>
    <project-type-select
      @change="$emit('onChange')"
      ref="select"
      v-show="isEdit === true"
      v-model="value"
    ></project-type-select>
  </td>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";
import { ProjectTypeDto, PriceRuleStateDto, PriceListDto } from "@/api/clients";

@Component({
  components: {
    ProjectTypeSelect,
  },
})
export default class PriceProjectTypeSelect extends Vue {
  @Prop({ required: true }) readonly value!: PriceRuleStateDto;
  @Prop({ required: true }) readonly priceList!: PriceListDto;
  @Ref("select") readonly select!: ProjectTypeSelect;

  items: Array<ProjectTypeDto> = [];
  isEdit = false;

  changeState() {
    if (this.priceList.isDraft) {
      this.isEdit = true;
      this.select.setFocus();
    }
  }

  get getProjectTypes() {
    for (let index = 0; index < this.items.length; index++) {
      if (this.items[index].id === this.value.projectTypeId)
        return this.items[index].name;
    }
    return "";
  }

  async created() {
    this.items = await applicationFacade.projectTypes.getAll();
  }
}
</script>
