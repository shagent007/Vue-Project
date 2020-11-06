<template>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div>
                    {{heading}}
                    <div
                        class="page-title-subheading">
                        {{subheading}}
                    </div>
                </div>
            </div>
            <div class="page-title-actions">
                <button type="button" class="btn-shadow mr-3 btn btn-dark">
                    <font-awesome-icon icon="star"/>
                </button>
                <button type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success">
                    <font-awesome-icon class="mr-2" icon="plus"/>
                    Create New
                </button>
            </div>
        </div>
    </div>
</template>

<script  lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faStar,
        faPlus
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    import {Prop} from "vue-property-decorator";

    library.add(
        faStar,
        faPlus,
    );

    @Component({
        components: {
            'font-awesome-icon': FontAwesomeIcon
        }
    })
    export default class General extends Vue {
        @Prop({required: true, type: String}) readonly icon!: string
        @Prop({required: true, type: String}) readonly heading!: string
        @Prop({required: true, type: String}) readonly subheading!: string
    }
</script>
