<template>
  <div class="main-card position-relative row form-group pb-3 card">
    <div class="col-sm-12">
      <label>Название</label>
      <b-form-input v-model="value.name" class="form-control"></b-form-input>
    </div>

    <div class="col-sm-12">
      <label for="sku">Дата создания</label>
      <div class="row">
        <date-picker v-model="value.dateFrom" class="col-sm-6" lang="ru"></date-picker>
        <date-picker v-model="value.dateTo" class="col-sm-6" lang="ru"></date-picker>
      </div>
    </div>

    <div class="col-sm-12">
      <label>Статус</label>
      <category-state-picker v-model="value.states" />
    </div>

    <div class="col-sm-12">
      <label>Родительская категория</label>
      <category-select
        v-model="value.parentId"
        :filterConfig="categoryFilterConfig"
        @input="value.parentId = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";

import DatePicker from "vue2-datepicker";
import CategorySelect from "@/pages/content/common/CategorySelect.vue";
import TagSelect from "@/pages/content/common/TagSelect.vue";
import CategoryStatePicker from "@/pages/content/Categories/CategoryStatePicker.vue";

@Component({
  components: {
    DatePicker,
    CategorySelect,
    TagSelect,
    CategoryStatePicker,
  },
})
export default class CategoryFilter extends Vue {
  @Prop({ type: Object }) value!: SearchCategoryCommand;

  categoryFilterConfig: SearchCategoryCommand = new SearchCategoryCommand();
}
</script>
