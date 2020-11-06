<template>
  <div class="project-type-tabs">
    <b-tabs card>
      <b-tab
        v-for="tab in tabs"
        :key="tab.id"
        :title="tab.projectType"
        @click="$emit('change', tab.id)"
      />
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch, Ref } from "vue-property-decorator";
import { CategorySchemaProjectTypeDto, CategorySchemaDto } from "@/api/clients";
import { categoryProjectTypeModule } from "@/store/modules/categoryProjectTypes.ts";

@Component
export default class CategoryElements extends Vue {
  @Prop({ required: true }) schema!: number;

  tabs = new Array<CategorySchemaProjectTypeDto>();

  @Watch("schema")
  async onUpdate() {
    await this.reload();
  }

  async created() {
    await categoryProjectTypeModule.load(this.schema);
    this.tabs = categoryProjectTypeModule.getCategoryProjectTypes;
    if (this.tabs.length === 0) return;
    this.$emit("change", this.tabs[0].id);
  }

  @Watch("categoryProjectTypeModule", {
    deep: true,
  })
  onStateChange(value: CategorySchemaProjectTypeDto[]) {
    console.log(value);
  }

  public async reload() {
    this.tabs = categoryProjectTypeModule.items;
    // console.log("from tabs", categoryProjectTypeModule.getCategoryProjectTypes);
    if (this.tabs.length === 0) return;
    this.$emit("change", this.tabs[0].id);
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