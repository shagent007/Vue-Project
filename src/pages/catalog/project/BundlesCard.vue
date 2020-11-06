<template>
  <div class="main-card mb-3 card">
    <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)" />
    <div class="card-header">Комплектации и цены</div>

    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <b-button
            class="mr-2 mb-2 btn-shadow"
            variant="primary"
            @click="onBundleSelected(0)"
          >Добавить</b-button>
          <b-button
            class="mr-2 mb-2 btn-shadow"
            variant="success"
            @click="showBundlePicker"
          >Добавить из шаблона</b-button>
        </div>
      </div>

      <b-table
        ref="table"
        class="align-middle mb-0"
        borderless
        striped
        hover
        primary-key="id"
        :items="itemsProvider"
        :fields="fields"
        :fixed="true"
      >
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="'width: ' + getColumnWidth(field.key)"
          />
        </template>

        <template v-slot:cell(actions)="data">
          <button class="border-0 btn-transition btn btn-outline-success" @click="edit(data.item)">
            <font-awesome-icon icon="edit" />
          </button>
          <button class="border-0 btn-transition btn btn-outline-danger" @click="remove(data.item)">
            <font-awesome-icon icon="trash-alt" />
          </button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import VueElementLoading from "vue-element-loading";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashAlt, faEdit);

import Component from "vue-class-component";
import Vue from "vue";
import { Prop, Ref } from "vue-property-decorator";
import {
  ProjectBundleDto,
  ProjectBundleOptionStateDto,
  ProjectBundleStateDto,
} from "@/api/clients";
import { create } from "vue-modal-dialogs";

import applicationFacade from "@/api/applicationFacade";
import BundlesPicker from "@/pages/catalog/Bundles/BundlesPicker.vue";
import ProjectBundleEditor from "@/pages/catalog/project/ProjectBundleEditor.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import { BTable } from "bootstrap-vue";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const bundlesPicker = create<number, number[], number>(
  BundlesPicker,
  "projectTypeId",
  "excludedIdx"
);

const projectBundleEditor = create<
  number,
  number,
  ProjectBundleStateDto,
  boolean
>(ProjectBundleEditor, "projectId", "projectTypeId", "value");

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    BundlesPicker,
    ProjectBundleEditor,
    VueElementLoading,
  },
})
export default class BundlesCard extends Vue {
  @Ref("table") readonly table!: BTable;
  @Prop({ required: true, type: Object }) readonly value!: {
    id: number;
    projectTypeId: number;
    price: number | undefined;
    state: number | undefined;
  };

  loading = false;
  bundlesPickerVisible = false;
  bundleEditorVisible = false;
  selectedBundle = new ProjectBundleStateDto();
  items: ProjectBundleDto[] = [];

  getColumnWidth(column: string) {
    if (column == "actions") return "100px;";

    if (column == "price") return "150px;";

    if (column == "discount") return "150px;";

    return "";
  }
  get excludedIdx() {
    return this.items.map((x) => x.id);
  }

  fields = [
    {
      key: "name",
      label: "Название компплекта",
      sortable: true,
    },
    {
      key: "discount",
      label: "Скидка",
      sortable: true,
    },
    {
      key: "totalPrice",
      label: "Цена",
      sortable: true,
    },
    {
      key: "actions",
      label: "",
    },
  ];

  reload() {
    this.table.refresh();
  }

  async itemsProvider() {
    this.loading = true;
    try {
      if (!this.value) return [];
      this.items = await applicationFacade.projectsService.getBundles(
        this.value.id
      );
      return this.items;
    } catch (e) {
      this.items = [];
      return [];
    } finally {
      this.loading = false;
    }
  }

  async showBundlePicker() {
    const bundleId = await bundlesPicker(
      this.value.projectTypeId,
      this.excludedIdx
    );

    if (bundleId != 0) {
      const bundle = await applicationFacade.bundlesService.get(bundleId);

      const projectBundle = new ProjectBundleStateDto({
        id: undefined,
        name: bundle.name,
        discount: bundle.discount,
        options: bundle.options?.map(
          (option) =>
            new ProjectBundleOptionStateDto({
              optionId: option.optionId,
              count: option.count,
              price: undefined,
            })
        ),
      });

      this.selectedBundle = projectBundle;
      this.$nextTick(() => {
        this.projectBundleEditorShow(this.selectedBundle);
      });
    } else {
      this.selectedBundle = new ProjectBundleStateDto();
      this.selectedBundle.options = new Array<ProjectBundleOptionStateDto>();
      this.$nextTick(() => {
        this.projectBundleEditorShow(this.selectedBundle);
      });
    }
  }

  async edit(bundle: ProjectBundleDto) {
    const bundleState = await applicationFacade.projectsService.getBundle(
      this.value.id,
      bundle.id
    );
    this.selectedBundle = bundleState;
    this.$nextTick(() => {
      this.projectBundleEditorShow(this.selectedBundle);
    });
  }

  async projectBundleEditorShow(selectedBundle: ProjectBundleStateDto) {
    const result = await projectBundleEditor(
      this.value.id,
      this.value.projectTypeId,
      selectedBundle
    );
    this.table.refresh();
  }

  async remove(bundle: ProjectBundleDto) {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данную комплектацию?"
    );
    if (!result) return;

    const resultOfDelete = await applicationFacade.projectsService.deleteBundle(
      this.value.id,
      bundle.id
    );

    this.value.price = resultOfDelete.price;
    this.value.state = resultOfDelete.state;

    this.reload();
  }
}
</script>
