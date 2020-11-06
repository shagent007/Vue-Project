

<template>
  <div style="position: absolute; z-index: 1040;">
    <div class="modal fade show d-block">
      <div class="modal-dialog modal-xl">
        <div role="document" class="modal-content">
          <header class="modal-header">
            <h5 class="modal-title">Добавить пользователя</h5>
            <button type="button" aria-label="Close" class="close" @click="close">×</button>
          </header>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-9">
                  <user-list
                    @add="select($event)"
                    buttonType="Выбрать"
                    ref="list"
                    :exludedId="exludedId"
                    v-model="filterConfig"
                  />
                </div>
                <div class="col-md-3">
                  <user-filter v-model="filterConfig" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" @click="close"></div>
  </div>
</template>

<script lang="ts">
import { DialogComponent } from "vue-modal-dialogs";
import Component from "vue-class-component";
import ActionButton from "@/pages/common/ActionButton.vue";

import { Ref, Watch, Prop } from "vue-property-decorator";
import { SearchUserCommand } from "@/api/site/SearchUserCommand.ts";

import UserList from "@/pages/site/Users/UserList.vue";
import UserFilter from "@/pages/site/Users/UserFilter.vue";

@Component({
  components: {
    ActionButton,
    UserList,
    UserFilter,
  },
})
export default class AddUserModal extends DialogComponent<number | null> {
  @Ref("list") readonly list!: UserList;
  @Prop({ required: true, type: Array }) readonly exludedId!: Array<number>;

  filterConfig = new SearchUserCommand();

  @Watch("filterConfig", {
    deep: true,
  })
  async onfilterChange(value: any) {
    this.list.reload();
  }

  select(event: number) {
    this.$close(event);
  }

  close() {
    this.$close(null);
  }
}
</script>

<style scoped>
.modal {
  overflow: auto;
}
</style>