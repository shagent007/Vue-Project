<template>
  <b-card class="mt-3 mb-3">
    <div class="position-relative row form-group">
      <label for="description" class="col-sm-2 col-form-label">Описание</label>
      <div class="col-sm-10">
        <html-editor
          name="description"
          v-model="value.description"
          placeholder="Описание"
          required
        />
      </div>
    </div>
  </b-card>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import HtmlEditor from "@/pages/common/HtmlEditor.vue";

@Component({
  components: {
    HtmlEditor,
  },
})
export default class Description extends Vue {
  @Prop({ required: true, type: Object }) readonly value!: {
    description: string;
  };
}
</script>