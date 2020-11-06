<template>
    <div>
        <div class="row">
            <div class="col-12">
                <b-button
                    class="mr-2 mb-2 btn-shadow"
                    variant="primary"
                    @click="modalVisible = true"
                    >Добавить</b-button
                >

                <image-uploader
                    :id="id + 'dropZone'"
                    :visible="modalVisible"
                    @uploaded="onUploaded"
                    :folder="folder"
                    :max="max"
                    @hidden="modalVisible = false"
                ></image-uploader>
            </div>
        </div>

        <div class="wrapper" v-if="showList">
            <draggable class="img-drag" v-model="getImages">
                <transition-group class="img-drag-transition">
                    <div
                        class="image-block"
                        v-for="(image, index) in getImages"
                        :key="image.id"
                    >
                        <a @click.prevent href="#" class="d-block mb-4">
                            <img
                                class="img-fluid img-thumbnail"
                                :src="getImageUrl(image.url)"
                                alt
                            />
                        </a>
                        <div @click.prevent="remove(index)" class="remove">
                            Удалить
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ImageDto } from "@/api/clients";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import ImageUploader from "@/pages/common/ImageUploader.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import draggable from "vuedraggable";
import { create } from "vue-modal-dialogs";

const confirmRemove = create<string, string, boolean>(
    ConfirmModal,
    "title",
    "message"
);

@Component({
    components: {
        ImageUploader,
        vueDropzone: vue2Dropzone,
        draggable
    }
})
export default class ImageList extends Vue {
    @Prop({ required: true, type: String }) readonly id!: string;
    @Prop({ type: Array }) images!: ImageDto[];
    @Prop({ type: Number }) readonly max!: number | null;
    @Prop({ required: true, type: String }) readonly folder!: string | null;

    modalVisible = false;
    imageList: Array<ImageDto> = [];

    updated() {
        this.imageList = this.images;
    }

    getImageUrl(url: string) {
        return url + "?width=300&height=200&mode=crop";
    }

    get getImages() {
        this.imageList = this.images;
        return this.imageList;
    }

    set getImages(value: ImageDto[]) {
        this.$emit("changed", value);
    }

    onUploaded(data: ImageDto[]) {
        this.images.push(...data);
    }

    async remove(id: number) {
        const result = await confirmRemove(
            "Внимание",
            "Вы действительно хотите удалить данную картинку?"
        );
        if (!result) return;

        this.images.splice(id, 1);
    }

    get showList() {
        return this.images && this.images.length > 0;
    }
}
</script>

<style scoped>
.wrapper > div > span {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
}

.image-block {
    margin-bottom: 1rem;
    flex-basis: 24%;
}

.image-block a {
    display: block;
    height: 200px;
}

.image-block a img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.remove {
    text-align: center;
    cursor: pointer;
}
</style>
