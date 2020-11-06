<template>
    <div class="app-footer">
        <div class="app-footer__inner">
            <div class="app-footer-left">
            </div>
            <div class="app-footer-right">
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faEllipsisV,
    } from '@fortawesome/free-solid-svg-icons'

    library.add(
        faEllipsisV,
    );
    @Component({
        name: "Footer",
        components: {
        }
    })
    export default class Footer extends Vue  {
    }
</script>
