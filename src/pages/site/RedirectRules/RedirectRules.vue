<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>

    <div class="row">
      <div class="col-md-9">
        <redirect-rule-list @edit="onEdit($event)" ref="list" v-model="searchRedirectRulesCommand" />
      </div>
      <div class="col-md-3">
        <redirect-rule-filter v-model="searchRedirectRulesCommand" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { RedirectRuleDto } from "@/api/clients";
import { SearchRedirectRuleCommand } from "@/api/site/SearchRedirectRuleCommand.ts";
import { Watch, Ref } from "vue-property-decorator";
import { create } from "vue-modal-dialogs";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import RedirectRuleList from "@/pages/site/RedirectRules/RedirectRuleList.vue";
import RedirectRuleEditor from "@/pages/site/RedirectRules/RedirectRuleEditor.vue";
import RedirectRuleFilter from "@/pages/site/RedirectRules/RedirectRuleFilter.vue";

const redirectRuleEditor = create<RedirectRuleDto, boolean>(
  RedirectRuleEditor,
  "model"
);

@Component({
  components: {
    RedirectRuleList,
    PageTitle,
    RedirectRuleFilter,
  },
})
export default class RedirectRules extends Vue {
  @Ref("list") readonly list!: RedirectRuleList;

  heading = "Правила переадресации";
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
  searchRedirectRulesCommand = new SearchRedirectRuleCommand();

  actions: PageTitleAction[] = [
    {
      text: "Добавить",
      icon: "plus",
      class: "btn-success",
      action: this.onAdd,
    },
  ];

  async onAdd() {
    await redirectRuleEditor(new RedirectRuleDto());
    this.list.reload();
  }

  async onEdit(event: RedirectRuleDto) {
    await redirectRuleEditor(event);
    this.list.reload();
  }

  @Watch("searchRedirectRulesCommand", { deep: true })
  onSearchRedirectRulesCommandChanged() {
    this.list.reload();
  }
}
</script>
