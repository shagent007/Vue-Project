<template>
  <div class="project-type-tabs">
    <b-tabs card>
      <b-tab v-for="tab in tabs" :key="tab.id" :title="tab.name" @click="$emit('update',tab.id)" />
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch, Ref } from "vue-property-decorator";
import { projectTypeModule } from "@/store/modules/projectTypes.ts";
import { ProjectTypeDto } from "@/api/clients";

@Component
export default class ProjectTypeTabs extends Vue {
  @Ref("navLink") readonly navLink!: HTMLCollection;

  tabs = new Array<ProjectTypeDto>();

  async created() {
    await projectTypeModule.getAllProjectTypes();
    this.tabs = projectTypeModule.getProjectTypes;
    this.$emit("update", this.tabs[0].id);
  }
}
</script>

<style>
.project-type-tabs .nav.nav-tabs.card-header-tabs {
  padding-left: 0px !important;
}

.project-type-tabs .tab-content {
  display: none;
}

.project-type-tabs .card-header {
  padding: 0px;
}

.project-type-tabs .card-header > .nav,
.project-type-tabs .card-header-tabs.nav-tabs {
  margin: 0px !important;
}
</style>