<template>
  <div>
    <div class="col-sm-10" v-for="item in items" :key="item.id">
      <role-select-check-box :roles="value.roles" :role="item" @select="onSelect($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";

import RoleSelectCheckBox from "@/pages/site/common/RoleSelectCheckBox.vue";

@Component({
  components: {
    RoleSelectCheckBox,
  },
})
export default class RoleSelectPicker extends Vue {
  @Prop({ required: true, type: Array }) readonly value!: Array<string>;
  items = new Array<string>();

  async created() {
    this.items = await applicationFacade.roles.getAll();
  }

  onSelect(event: any) {
    if (event.selected) {
      this.value.push(event.role);
    } else {
      this.value.splice(this.value.indexOf(event.role), 1);
    }

    this.$emit("update", this.value);
  }
}
</script>