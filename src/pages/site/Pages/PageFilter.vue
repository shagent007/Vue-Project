<template>
  <div class="main-card position-relative row form-group pb-3 card">
    <div class="col-sm-12">
      <label>Название</label>
      <b-form-input v-model="value.name" class="form-control"></b-form-input>
    </div>

    <div class="col-sm-12">
      <label>Родитель</label>
      <page-parent-select
        v-model="value.parentId"
        @input="parentChange($event)"
        :filterConfig="newFilterConfig"
      />
    </div>

    <div class="col-sm-12">
      <label>Статус</label>
      <page-state-picker v-model="value.states" />
    </div>

    <div class="col-sm-12">
      <label for="sku">Дата создания</label>
      <div class="row">
        <date-picker v-model="value.dateFrom" class="col-sm-6" lang="ru"></date-picker>
        <date-picker v-model="value.dateTo" class="col-sm-6" lang="ru"></date-picker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { SearchPageCommand } from "@/api/site/SearchPageCommand.ts";

import DatePicker from "vue2-datepicker";
import PageParentSelect from "@/pages/site/common/PageParentSelect.vue";
import TagSelect from "@/pages/content/common/TagSelect.vue";
import PageStatePicker from "@/pages/site/Pages/PageStatePicker.vue";

@Component({
  components: {
    DatePicker,
    PageParentSelect,
    TagSelect,
    PageStatePicker,
  },
})
export default class PageFilter extends Vue {
  @Prop({ type: Object }) value!: SearchPageCommand;
  newFilterConfig = new SearchPageCommand();
  created() {
    this.newFilterConfig.states = [1];
  }

  parentChange(event: number) {
    this.value.parentId = event;
    this.$emit("update", this.value.parentId);
  }
}
</script>

