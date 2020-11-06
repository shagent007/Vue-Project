<template>
  <div>
    <page-title :heading="heading" :icon="icon" :actions="actions"></page-title>
    <setting-list ref="list" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Ref } from "vue-property-decorator";
import { SearchPageCommand } from "@/api/site/SearchPageCommand.ts";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import { create } from "vue-modal-dialogs";
import { SettingStateDto } from "@/api/clients";

import PageTitle from "@/Layout/Components/PageTitle.vue";
import SettingList from "@/pages/site/Settings/SettingList.vue";
import PageFilter from "@/pages/site/Pages/PageFilter.vue";

@Component({
  components: {
    SettingList,
    PageTitle,
    PageFilter,
  },
})
export default class Settings extends Vue {
  @Ref("list") readonly list!: SettingList;

  heading = "Настройки";
  icon = "pe-7s-plane icon-gradient bg-tempting-azure";
}
</script>
