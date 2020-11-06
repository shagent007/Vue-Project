<template>
  <b-modal ref="modal" :title="title" hide-footer :visible="visible" @hidden="$emit('hidden')">
    <h1>
      <center>{{password}}</center>
    </h1>
    <div class="row">
      <div class="col">
        <b-button variant="primary" @click="$emit('confirm')" block>Далее</b-button>
      </div>
      <div class="col">
        <b-button @click="$emit('hidden')" block>Отмена</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Ref } from "vue-property-decorator";
import { BModal } from "bootstrap-vue";

@Component
export default class extends Vue {
  @Ref("modal") readonly modal!: BModal;
  @Prop({ required: true, type: Boolean }) readonly visible!: boolean;
  @Prop({ required: true }) readonly password!: string;
  @Prop({ type: String, default: "Запомните свой пароль" })
  readonly title?: string;
}
</script>