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
      <post-state-picker v-model="value.states" />
    </div>

    <div class="col-sm-12">
      <label>Категория</label>
      <category-select v-model="value.categoryId" :filterConfig="categoryFilterConfig" />
    </div>

    <div class="col-sm-12">
      <label>Тег</label>
      <tag-select v-model="value" :filterConfig="tagFilterConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SearchPostsCommand } from "@/api/content/SearchPostsCommand.ts";
import { SearchTagCommand } from "@/api/content/SearchTagCommand.ts";
import { SearchCategoryCommand } from "@/api/content/SearchCategoryCommand.ts";

import DatePicker from "vue2-datepicker";
import CategorySelect from "@/pages/content/common/CategorySelect.vue";
import TagSelect from "@/pages/content/common/TagSelect.vue";
import PostStatePicker from "@/pages/content/Posts/PostStatePicker.vue";

@Component({
  components: {
    DatePicker,
    CategorySelect,
    TagSelect,
    PostStatePicker,
  },
})
export default class PostsFilter extends Vue {
  @Prop({ type: Object }) value!: SearchPostsCommand;

  tagFilterConfig: SearchTagCommand = new SearchTagCommand();
  categoryFilterConfig: SearchCategoryCommand = new SearchCategoryCommand();
}
</script>


<style scoped>
</style>
