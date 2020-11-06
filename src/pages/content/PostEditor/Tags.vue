<template>
  <b-card class="mt-3" title="Теги">
    <div class="col-sm-10" v-for="item in items" :key="item.id">
      <tag-select-picker :tags="value.tags" :tag="item" @select="onSelect($event)" />
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { TagDto, PostStateDto } from "@/api/clients";
import applicationFacade from "@/api/applicationFacade";
import { SearchTagCommand } from "@/api/content/SearchTagCommand.ts";
import TagSelectPicker from "@/pages/content/Tags/TagSelectPicker.vue";

@Component({
  components: {
    TagSelectPicker,
  },
})
export default class Tags extends Vue {
  @Prop({ required: true, type: Object }) readonly value!: PostStateDto;
  items = new Array<TagDto>();
  filterConfig = new SearchTagCommand();

  async created() {
    const result = await applicationFacade.tags.search(
      this.filterConfig.name,
      this.filterConfig.dateFrom,
      this.filterConfig.dateTo,
      this.filterConfig.states,
      1,
      30
    );
    this.items = result.items ?? [];
  }

  onSelect(event: any) {
    if (event.selected) {
      this.value.tags?.push(event.tag.id);
    } else {
      if (this.value.tags) {
        for (let index = 0; index < this.value.tags.length; index++) {
          if (this.value.tags[index] === event.tag.id) {
            this.value.tags?.splice(index, 1);
            break;
          }
        }
      }
    }
  }
}
</script>