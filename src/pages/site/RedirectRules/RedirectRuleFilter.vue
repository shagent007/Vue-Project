<template>
  <b-card>
    <div class="col-sm-12">
      <label for="ProjectCode">Старый URL</label>
      <b-form-input v-model="value.oldSlug" class="form-control"></b-form-input>
    </div>

    <div class="col-sm-12">
      <label for="ProjectCode">Новый URL</label>
      <b-form-input v-model="value.newSlug" class="form-control"></b-form-input>
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SearchRedirectRuleCommand } from "@/api/site/SearchRedirectRuleCommand.ts";

@Component
export default class ProjectsFilter extends Vue {
  @Prop({ type: Object }) value!: SearchRedirectRuleCommand;
}
</script>
