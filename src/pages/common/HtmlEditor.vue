<template>
  <ckeditor
    :editor="editor"
    :config="editorConfig"
    :value="value"
    @input="onInput($event)"
    @blur="changed(newValue)"
  ></ckeditor>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  components: {
    ckeditor: CKEditor.component,
  },
})
export default class HtmlEditor extends Vue {
  @Prop({ type: String }) readonly value!: string | null | undefined;

  newValue = "";

  editor = ClassicEditor;
  changed(event: string | null | undefined) {
    this.$emit("input", event);
  }

  onInput(event: string) {
    this.newValue = event;
  }

  editorConfig = {};
}
</script>
