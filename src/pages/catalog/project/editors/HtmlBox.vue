<template>
    <ckeditor
        ref="ckEditor"
        :editor="editor"
        :config="editorConfig"
        v-model="model"
        @ready="onEditorReady"
    ></ckeditor>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop, Ref, Watch} from "vue-property-decorator";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
    components: {
        ckeditor: CKEditor.component
    }
})
export default class HtmlBox extends Vue {
    @Prop({ type: String }) readonly value!: string | null | undefined;
    @Ref("ckEditor") readonly instance!: any;

    editor = ClassicEditor;
    editorConfig = {};

    model: string | null | undefined = "";

    created() {
        this.model = this.value;
    }

    onEditorReady() {
        this.instance.instance.setData(this.value);
    }

    @Watch("model")
    changed(event: string | null | undefined) {
        this.$emit("input", event);
    }
}
</script>
