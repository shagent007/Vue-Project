<template>
  <div class="main-card position-relative row form-group mb-3 pb-4 pt-2 card">
    <div class="col-sm-12">
      <label>Тип проекта</label>
      <project-type-select v-model="value" />
    </div>
    <div class="col-sm-12">
      <label for="ProjectCode">Код проекта</label>
      <b-form-input id="ProjectCode" v-model="value.sku" class="form-control"></b-form-input>
    </div>
    <div class="col-sm-12">
      <label>Архитектор</label>
      <architext-select v-model="value" />
    </div>
    <div class="col-sm-12">
      <label>Коллекции</label>
      <collection-select v-model="value" />
    </div>
    <div class="col-sm-12">
      <label for="sku">Статус</label>
      <project-states-picker v-model="value.state" />
    </div>
    <div class="col-sm-12">
      <label for="sku">Дата создание</label>
      <div class="row">
        <date-picker v-model="value.from" class="col-sm-6" lang="ru"></date-picker>
        <date-picker v-model="value.to" class="col-sm-6" lang="ru"></date-picker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DatePicker from "vue2-datepicker";
import ArchitextSelect from "@/pages/catalog/common/ArchitextSelect.vue";
import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";
import { ProjectState } from "@/api/clients.ts";
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";
import ProjectStatesPicker from "@/pages/catalog/projects/ProjectStatesPicker.vue";
import CollectionSelect from "@/pages/catalog/common/CollectionSelect.vue";

@Component({
  components: {
    DatePicker,
    ArchitextSelect,
    ProjectTypeSelect,
    ProjectStatesPicker,
    CollectionSelect,
  },
})
export default class ProjectsFilter extends Vue {
  @Prop({ type: Object }) value!: SearchProjectsCommand;
}
</script>
