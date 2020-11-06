<template>
  <div class="wrapper pb-4">
    <image-uploader
      :id="imageId"
      :visible="modalVisible"
      @uploaded="onUploaded($event)"
      :folder="folder"
      :max="1"
      @hidden="modalVisible = false"
      message="Щелкните в эту область для выбора изображения"
    />

    <div
      class="main-picture mb-3"
      :style="{ backgroundImage: `url('${image.url}')` }"
      @click="modalVisible = true"
      v-if="image.url"
    ></div>

    <div v-if="!image.url" class="main-picture defaultImage mb-3" @click="modalVisible = true"></div>
    <div v-if="!image.url" class="change" @click="remove()">Удалить</div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { ImageDto } from "@/api/clients";
import ImageUploader from "@/pages/common/ImageUploader.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import { create } from "vue-modal-dialogs";

const confirmRemove = create<string, string, boolean>(
  ConfirmModal,
  "title",
  "message"
);

@Component({
  components: {
    ImageUploader,
  },
})
export default class MainImage extends Vue {
  @Prop({ type: Object }) readonly value!: ImageDto | null;
  @Prop({ type: String }) readonly imageId!: string;
  @Prop({ type: String }) readonly folder!: string;

  modalVisible = false;
  max = 1;

  get image() {
    return this.value ?? new ImageDto();
  }

  async remove() {
    const result = await confirmRemove(
      "Внимание",
      "Вы действительно хотите удалить данную Картинку?"
    );
    if (!result) return;

    this.$emit("update", null);
  }

  onUploaded(event: ImageDto[]) {
    this.$emit("update", event[event.length - 1]);
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}

.main-picture {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.defaultImage {
  background-image: url("../../assets/images/unnamed.png");
}

.change {
  text-align: center;
  cursor: pointer;
}
</style>
