<template>
    <div style="position: absolute; z-index: 1040;">
        <div class="modal fade show d-block">
            <div class="modal-dialog modal-sm">
                <div role="document" class="modal-content">
                    <header class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button
                            type="button"
                            aria-label="Close"
                            class="close"
                            @click="decline"
                        >
                            ×
                        </button>
                    </header>
                    <div class="modal-body">
                        {{ message }}
                    </div>
                    <footer class="modal-footer">
                        <b-button variant="secondary" @click="decline"
                            >Омена</b-button
                        >
                        <action-button className="btn-primary" :action="confirm"
                            >Да</action-button
                        >
                    </footer>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show" @click="decline"></div>
    </div>
</template>

<script lang="ts">
import { DialogComponent } from "vue-modal-dialogs";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ActionButton from "@/pages/common/ActionButton.vue";

@Component({
    components: {
        ActionButton
    }
})
export default class DeleteModal extends DialogComponent<boolean> {
    @Prop({ type: String }) readonly title!: string;
    @Prop({ type: String }) readonly message!: string;

    confirm() {
        this.$close(true);
    }

    decline() {
        this.$close(false);
    }
}
</script>
