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
      <tag-state-picker v-model="value.states" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SearchTagCommand } from "@/api/content/SearchTagCommand.ts";

import DatePicker from "vue2-datepicker";
import TagStatePicker from "@/pages/content/Tags/TagStatePicker.vue";

@Component({
  components: {
    DatePicker,
    TagStatePicker,
  },
})
export default class TagFilter extends Vue {
  @Prop({ type: Object }) value!: SearchTagCommand;
}
</script>
