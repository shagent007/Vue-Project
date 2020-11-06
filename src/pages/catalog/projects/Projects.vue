<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>
    <div class="row">
      <div class="col-md-9">
        <project-list ref="list" v-model="searchProjectsCommand" />
      </div>
      <div class="col-md-3">
        <projects-filter v-model="searchProjectsCommand"></projects-filter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import ProjectList from "@/pages/catalog/projects/ProjectList.vue";
import CreateProjectModal from "@/pages/catalog/project/CreateProjectModal.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import ProjectsFilter from "@/pages/catalog/projects/ProjectsFilter.vue";
import { Ref, Watch } from "vue-property-decorator";
import { SearchProjectsCommand } from "@/api/catalog/SearchProjectsCommand.ts";
import { create } from "vue-modal-dialogs";

const createProjectModal = create<SearchProjectsCommand, boolean>(
  CreateProjectModal,
  "filterConfig"
);
@Component({
  components: {
    PageTitle,
    ProjectList,
    ProjectsFilter,
  },
})
export default class ProjectsView extends Vue {
  @Ref("list") readonly list!: ProjectList;
  heading = "Каталог проектов";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";

  searchProjectsCommand = new SearchProjectsCommand();

  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  created() {
    if (!this.$route.query.q) return;
    this.searchProjectsCommand = JSON.parse(String(this.$route.query.q));
  }

  @Watch("searchProjectsCommand", {
    deep: true,
  })
  async onfilterChange(value: SearchProjectsCommand) {
    this.list.reload();

    if (JSON.stringify(value) === String(this.$route.query.q)) return;
    console.log("from watch", value);

    // const query = { ...this.$route.query, q: JSON.stringify(value) };
    // this.$router.replace({ query });
    this.$router.push({
      name: "projects",
      query: Object.assign({}, this.$route.query, { q: JSON.stringify(value) }),
    });
  }

  @Watch("$route", {
    deep: true,
  })
  onRouteChange(value: any) {
    if (JSON.stringify(this.searchProjectsCommand) === String(value.query.q))
      return;
    this.searchProjectsCommand = JSON.parse(String(value.query.q));
    console.log(this.searchProjectsCommand, JSON.parse(String(value.query.q)));
    this.list.reload();
  }

  async onAdd() {
    await createProjectModal(this.searchProjectsCommand);
  }
}
</script>
