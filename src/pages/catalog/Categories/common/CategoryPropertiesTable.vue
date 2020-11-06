<template>
  <table class="align-middle mb-0 table table-borderless table-striped table-hover">
    <thead>
      <tr>
        <th>Свойтва</th>
        <th>Значение</th>
      </tr>
      <tr>
        <td>
          <b-form-input v-model="item.property"></b-form-input>
        </td>
        <td>
          <b-form-input v-model="item.value"></b-form-input>
        </td>
        <td>
          <button @click.prevent="add()" class="border-0 btn-transition btn btn-outline-primary">
            <font-awesome-icon icon="plus" />
          </button>
        </td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item,index) in value" :key="index">
        <td>
          <b-form-input v-model="item.property"></b-form-input>
        </td>
        <td>
          <b-form-input v-model="item.value"></b-form-input>
        </td>
        <td>
          <button
            @click.prevent="remove(index)"
            class="border-0 btn-transition btn btn-outline-danger"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import applicationFacade from "@/api/applicationFacade";
import { Ref, Watch, Prop } from "vue-property-decorator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { CategorySchemaPropertyDto } from "@/api/clients";
library.add(faPlus);

@Component({
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
})
export default class CategoryElementsList extends Vue {
  @Prop({ required: true }) value!: Array<CategorySchemaPropertyDto>;

  item = new CategorySchemaPropertyDto();

  add() {
    this.value.push(this.item);
    this.item = new CategorySchemaPropertyDto();
  }

  remove(index: number) {
    this.value.splice(index, 1);
  }
}
</script>
