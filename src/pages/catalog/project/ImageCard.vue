<template v-show="value">
  <div class="main-card mb-3 card">
    <div class="card-body">
      <h5 class="card-title">{{title}}</h5>
      <image-list
        @changed="$emit('onChange', $event)"
        :id="id"
        :folder="folder"
        :images="value"
        :max="10"
      ></image-list>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop, Watch } from "vue-property-decorator";
import ImageList from "@/pages/common/ImageList.vue";
import { ImageDto } from "@/api/clients";

@Component({
  components: {
    ImageList
  }
})
export default class ImageCard extends Vue {
  @Prop({ required: true, type: String }) readonly id!: string;
  @Prop({ required: true, type: String }) readonly title!: string;
  @Prop({ required: true, type: String }) readonly folder!: string;
  @Prop({ type: Array }) readonly value!: ImageDto[];
}
</script>

