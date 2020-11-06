<template>
  <b-modal
    title="Загрузка изображений"
    :visible="visible"
    @ok="$emit('uploaded', images)"
    @hidden="$emit('hidden')"
    ok-title="Добавить"
    cancel-title="Отмена"
  >
    <vue-dropzone
      :id="id"
      :options="options"
      @vdropzone-success="onUploaded"
    >Drop files here or click to upload. 1111</vue-dropzone>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IImageDto, ImageDto } from "@/api/clients";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { userModule } from "@/store/modules/user";
import applicationFacade from "@/api/applicationFacade";

@Component({
  components: {
    vueDropzone: vue2Dropzone
  }
})
export default class ImageUploader extends Vue {
  @Prop({ required: true, type: String }) readonly id!: string;
  @Prop({ required: true, type: Boolean }) readonly visible!: boolean;
  @Prop({ required: true, type: String }) readonly folder!: string;
  @Prop({ type: Number }) readonly max!: number | null;
  @Prop({
    type: String,
    default:
      "Щелкните в эту область для выбора одного или нескольких изображений"
  })
  readonly message!: string;

  images: ImageDto[] = [];

  onUploaded(file: any, response: IImageDto[]) {
    const data = response.map(value => new ImageDto(value));
    this.images.push(...data);
  }

  get options() {
    return {
      url: `${applicationFacade.baseUrl}/api/files?folder=${this.folder}`,
      method: "post",
      addRemoveLinks: true,
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      maxFiles: this.max,
      dictDefaultMessage: this.message,
      headers: { Authorization: "Bearer " + userModule.token }
    };
  }
}
</script>