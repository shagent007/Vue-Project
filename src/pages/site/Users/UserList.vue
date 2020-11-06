<template>
  <div class="main-card mb-3 card">
    <div class="card-body">
      <b-table
        ref="table"
        class="align-middle mb-0"
        borderless
        striped
        hover
        primary-key="id"
        :items="itemsProvider"
        :fields="fields"
        :busy.sync="isBusy"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage"
      >
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{width: field.key === 'actions' ? '90px' : 'auto' }"
          />
        </template>
        <template v-slot:cell(actions)="data">
          <div style="text-align: center;">
            <button
              @click="edit(data.item.id)"
              class="border-0 btn-transition btn btn-outline-primary"
              v-if="buttonType === 'Открыть'"
            >
              <font-awesome-icon icon="edit" />
            </button>
            <button
              type="button"
              class="btn btn-success btn-sm"
              v-else-if="buttonType === 'Выбрать'"
              @click="$emit('add', data.item.id)"
            >Выбрать</button>
          </div>
        </template>
      </b-table>
    </div>

    <div class="d-block text-center card-footer" v-show="pagination.visible">
      <b-pagination
        class="mb-0 pl-0"
        v-model="pagination.currentPage"
        :total-rows="pagination.totalRows"
        :per-page="pagination.perPage"
      ></b-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { UserDto } from "@/api/clients";
import { BTable } from "bootstrap-vue";
import { SearchUserCommand } from "@/api/site/SearchUserCommand.ts";
import PostStatus from "@/pages/content/Posts/PostStatus.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    PostStatus,
  },
})
export default class UserList extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ type: Object }) value!: SearchUserCommand;
  @Prop({ type: String, default: "Открыть" }) buttonType!: string;
  @Prop({ type: Array, default: () => [] }) exludedId!: Array<number>;

  pagination = {
    currentPage: 1,
    perPage: 30,
    totalRows: 0,
    visible: false,
  };

  isBusy = false;

  fields = [
    {
      key: "userName",
      label: "Имя пользователя",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "phoneNumber",
      label: "Номер телефона",
      sortable: true,
    },

    {
      key: "actions",
      label: "",
    },
  ];

  async itemsProvider(ctx: any, callback: any) {
    this.isBusy = true;
    try {
      const result = await applicationFacade.users.search(
        this.value.phoneNumber,
        this.value.email,
        this.value.userName,
        this.value.roles,
        ctx.currentPage,
        ctx.perPage
      );

      this.pagination.totalRows = result.rowCount;
      this.isBusy = false;

      if (result.items && result.items.length > 0) {
        this.pagination.visible = true;
      }

      return result.items?.filter((x) => this.exludedId.indexOf(x.id) === -1);
    } catch (e) {
      this.isBusy = false;
      return [];
    }
  }

  @Watch("pagination.currentPage")
  async onPageChange(value: number) {
    this.table.refresh();
  }

  add(): boolean {
    return true;
  }

  edit(userId: string): void {
    this.$router.push({ name: "site-user-id", params: { id: userId } });
  }

  remove(post: UserDto): boolean {
    return true;
  }

  public reload() {
    this.table.refresh();
  }
}
</script>