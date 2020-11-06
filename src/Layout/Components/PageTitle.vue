<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i :class="icon" />
        </div>
        <div class="mr-3">
          {{ heading }}
          <div class="page-title-subheading">{{ subheading }}</div>
        </div>
        <slot></slot>
      </div>
      <div class="page-title-actions" v-if="showActions">
        <span v-for="item in actions" :key="item.text" class="mr-3">
          <button :class="'btn-shadow btn ' + item.class" @click.prevent="item.action()">
            <font-awesome-icon class="mr-2" v-if="item.icon" :icon="item.icon" />
            <span v-text="item.text"></span>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PageTitleAction from "@/Layout/Components/PageTitle/PageTitleAction";
import ActionButton from "@/pages/common/ActionButton.vue";

library.add(faStar, faPlus);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    ActionButton,
  },
})
export default class PageTitle extends Vue {
  @Prop({ type: String }) readonly icon!: string;
  @Prop({ required: true, type: String }) readonly heading!: string | undefined;
  @Prop({ type: String }) readonly subheading!: string;
  @Prop({ type: Array }) readonly actions!: PageTitleAction[];

  get showActions() {
    return this.actions && this.actions.length > 0;
  }
}
</script>
