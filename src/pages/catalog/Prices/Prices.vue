<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon" :actions="actions">
      <price-list-select ref="listPicker" @change="onVersionChange($event)" />
    </page-title>

    <div class="main-card mb-3 card">
      <div class="card-body">
        <project-type-tabs @update="onProjectTypeUpdate($event)" />

        <table
          v-if="isHasOptions"
          class="align-middle mb-0 table table-borderless table-striped table-hover"
        >
          <prices-header :options="options" />
          <add-price v-model="newPrice" @onAdd="onAdd" v-if="priceList.isDraft" />
          <tbody>
            <tr v-for="(price, index) in prices" :key="price.id">
              <price-query
                :priceList="priceList"
                @onChange="onChange(price)"
                v-model="prices[index]"
              />

              <price-option
                :priceList="priceList"
                v-for="(option, j) in price.options"
                :key="option.optionId"
                v-model="prices[index].options[j]"
                @onChange="onChange(prices[index])"
              />

              <td>
                <button
                  @click="remove(price.id)"
                  class="border-0 btn-transition btn btn-outline-danger"
                  v-if="priceList.isDraft"
                >
                  <font-awesome-icon icon="trash-alt" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Ref } from "vue-property-decorator";

import applicationFacade from "@/api/applicationFacade";
import {
  OptionDto,
  PriceRuleStateDto,
  PriceRuleOptionDto,
  PriceListDto,
} from "@/api/clients.ts";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { create } from "vue-modal-dialogs";

import ProjectTypeSelect from "@/pages/catalog/common/ProjectTypeSelect.vue";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import ProjectTypeTabs from "@/pages/catalog/common/ProjectTypeTabs.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import PriceOption from "@/pages/catalog/Prices/PriceOption.vue";
import PriceProjectType from "@/pages/catalog/Prices/PriceProjectType.vue";
import PriceQuery from "@/pages/catalog/Prices/PriceQuery.vue";
import AddPrice from "@/pages/catalog/Prices/AddPrice.vue";
import PricesHeader from "@/pages/catalog/Prices/PricesHeader.vue";
import PriceListSelect from "@/pages/catalog/Prices/PriceListSelect.vue";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

const confirmCancel = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

@Component({
  components: {
    ProjectTypeSelect,
    PageTitle,
    "font-awesome-icon": FontAwesomeIcon,
    PriceProjectType,
    PriceOption,
    PriceQuery,
    AddPrice,
    PricesHeader,
    ProjectTypeTabs,
    PriceListSelect,
  },
})
export default class Prices extends Vue {
  @Ref("listPicker") readonly listPicker!: PriceListSelect;

  heading = "Цены";
  subheading = "";
  icon = "pe-7s-home  icon-gradient bg-tempting-azure";
  options = new Array<OptionDto>();
  prices = new Array<PriceRuleStateDto>();
  newPrice = new PriceRuleStateDto();
  priceOptions = new Array<PriceRuleOptionDto>();
  priceList = new PriceListDto();
  currentProjectTypeId = 0;
  isHasOptions = true;

  get actions() {
    if (this.priceList.isDraft)
      return [
        {
          text: "Опубликовать",
          class: "btn-success",
          action: this.publish,
        },
        {
          text: "Отмена",
          class: "btn-warning",
          action: this.cancel,
        },
      ];

    if (this.priceList.isPublished)
      return [
        {
          text: "Изменить",
          class: "btn-primary",
          action: this.change,
        },
      ];

    return [];
  }

  async publish() {
    await applicationFacade.priceService.publish(this.priceList.id);
    await this.listPicker.reload();
  }

  async cancel() {
    const result = await confirmCancel(
      "Внимание",
      "Вы действительно хотите отменить все изменения"
    );
    if (!result) return;

    await applicationFacade.priceService.delete(this.priceList.id);
    await this.listPicker.reload();
  }

  async change() {
    await applicationFacade.priceService.create(this.priceList.id);
    await this.listPicker.reload();
  }

  onVersionChange(event: PriceListDto) {
    this.priceList = event;
  }

  async created() {
    this.options = await applicationFacade.optionsService.getAll(
      this.currentProjectTypeId
    );
  }

  private initNewPrice() {
    this.newPrice = new PriceRuleStateDto();
    this.newPrice.options = this.options.map(
      (x) =>
        new PriceRuleOptionDto({
          optionId: x.id,
          price: undefined,
        })
    );
  }

  private initMissingOptions() {
    this.prices.forEach((price) => {
      if (!price.options) price.options = [];

      this.options.forEach((option) => {
        const existingOption = price.options?.find(
          (x) => x.optionId == option.id
        );
        if (existingOption) return;

        price.options?.push(
          new PriceRuleOptionDto({
            optionId: option.id,
            price: undefined,
          })
        );
      });
    });
  }

  async onAdd() {
    this.newPrice.projectTypeId = this.currentProjectTypeId;
    await applicationFacade.priceService.saveRule(
      this.priceList.id,
      this.newPrice
    );
    this.prices = await applicationFacade.priceService.getRules(
      this.priceList.id,
      this.currentProjectTypeId
    );
    this.initNewPrice();
    this.initMissingOptions();
  }
  async onChange(value: PriceRuleStateDto) {
    await applicationFacade.priceService.saveRule(this.priceList.id, value);
    this.prices = await applicationFacade.priceService.getRules(
      this.priceList.id,
      this.currentProjectTypeId
    );
    this.initMissingOptions();
  }

  async onProjectTypeUpdate(event: number) {
    this.currentProjectTypeId = event;
    this.options = await applicationFacade.optionsService.getAll(
      this.currentProjectTypeId
    );

    this.isHasOptions = this.options.length > 0;

    this.prices = await applicationFacade.priceService.getRules(
      this.priceList.id,
      this.currentProjectTypeId
    );
    this.initNewPrice();
    this.initMissingOptions();
  }

  async remove(id: number) {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данную цену?"
    );
    if (!result) return;

    await applicationFacade.priceService.deleteRule(
      id,
      this.priceList.id.toString()
    );
    this.prices = await applicationFacade.priceService.getRules(
      this.priceList.id,
      this.currentProjectTypeId
    );
    this.initMissingOptions();
  }

  @Watch("priceList")
  async onPriceListChange() {
    this.prices = await applicationFacade.priceService.getRules(
      this.priceList.id,
      this.currentProjectTypeId
    );

    this.initNewPrice();
    this.initMissingOptions();
  }
}
</script>

<style scoped>
td,
th {
  text-align: center;
}

.card-body {
  padding-top: 0px;
}
</style>
