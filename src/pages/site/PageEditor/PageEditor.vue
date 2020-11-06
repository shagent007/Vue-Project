<template>
    <div>
        <page-title
            :heading="heading"
            :subheading="subheading"
            :icon="icon"
            :actions="actions"
        ></page-title>
        <div class="row">
            <div class="col-md-12">
                <general v-model="model" />
                <additional v-model="model" />
                <description v-model="model" />
                <seo :errors="errors" v-model="model" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { debounce } from "lodash";
import { Prop, Watch } from "vue-property-decorator";
import applicationFacade from "@/api/applicationFacade";
import { PageStateDto, CategoryDto, PublishPageOptions } from "@/api/clients";
import { create } from "vue-modal-dialogs";

import General from "@/pages/site/PageEditor/General.vue";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import Seo from "@/pages/common/editors/SeoCard.vue";
import Description from "@/pages/common/Description.vue";
import ConfirmModal from "@/pages/common/ConfirmModal.vue";
import Additional from "@/pages/common/Additional.vue";

const confirmRemove = create<string, string, boolean>(
    ConfirmModal,
    "title",
    "message"
);

@Component({
    components: {
        Seo,
        General,
        PageTitle,
        Description,
        Additional
    }
})
export default class PageEditor extends Vue {
    @Prop({ required: true, type: Number }) readonly id!: number;

    get heading() {
        if (this.model.name) return this.model.name;
        return "";
    }

    get subheading() {
        return "";
    }

    errors: { [name: string]: string } = {};
    icon = "pe-7s-plane icon-gradient bg-tempting-azure";
    model: PageStateDto = new PageStateDto();

    get actions() {
        if (this.model.state === 0)
            return [
                {
                    text: "Опубликовать",
                    class: "btn-success",
                    action: this.publish
                },
                {
                    text: "Удалить",
                    class: "btn-danger",
                    action: this.remove
                }
            ];
        if (this.model.state === 1)
            return [
                {
                    text: "Удалить",
                    class: "btn-danger",
                    action: this.remove
                }
            ];

        return [];
    }

    async remove() {
        const result = await confirmRemove(
            "Внимание",
            "Вы действительно хотите удалить данную страницу?"
        );
        if (!result) return;

        try {
            this.model = await applicationFacade.pages.delete(
                Number(this.model.id)
            );
        } catch (ex) {
            console.log(ex);
        }
    }

    save_debounce: any = debounce(
        (model: PageStateDto) => applicationFacade.pages.save(model),
        2000,
        { maxWait: 5000 }
    );

    get valid(): boolean {
        return true;
    }

    async created() {
        this.model = await applicationFacade.pages.getById(Number(this.id));
    }

    @Watch("model", {
        deep: true
    })
    save(value: PageStateDto) {
        this.save_debounce(value);
    }

    async publish() {
        this.model = await applicationFacade.pages.publish(
            Number(this.id),
            new PublishPageOptions()
        );
    }
}
</script>
