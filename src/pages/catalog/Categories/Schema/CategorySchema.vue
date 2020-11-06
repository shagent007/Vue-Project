<template>
  <b-card title="Настройки">
    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">Разделитель URL</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.separator"
          :disabled="!schema.isDraft"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">Title</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.titleTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">MetaKeywords</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.metaKeywordsTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">MetaDescription</label>
      <div class="col-sm-10">
        <b-form-textarea @change="$emit('change', value)" v-model="value.metaDescriptionTemplate"></b-form-textarea>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">H1</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.h1Template"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">Description</label>
      <div class="col-sm-10">
        <b-form-textarea @change="$emit('change', value)" v-model="value.descriptionTemplate"></b-form-textarea>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">NavLinkText</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.navLinkTextTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">NavLinkTitle</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.navLinkTitleTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">FirstNavLinkText</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.firstNavLinkTextTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">FirstNavLinkTitle</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.firstNavLinkTitleTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

      <div class="position-relative row form-group">
          <label for="sku" class="col-sm-2 col-form-label">HeaderNavLinkText</label>
          <div class="col-sm-10">
              <b-form-input
                  @change="$emit('change', value)"
                  v-model="value.headerNavLinkTextTemplate"
                  class="form-control"
              ></b-form-input>
          </div>
      </div>

      <div class="position-relative row form-group">
          <label for="sku" class="col-sm-2 col-form-label">HeaderNavLinkTitle</label>
          <div class="col-sm-10">
              <b-form-input
                  @change="$emit('change', value)"
                  v-model="value.headerNavLinkTitleTemplate"
                  class="form-control"
              ></b-form-input>
          </div>
      </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">MenuLinkTitle</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.menuLinkTextTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>

    <div class="position-relative row form-group">
      <label for="sku" class="col-sm-2 col-form-label">MenuLinkText</label>
      <div class="col-sm-10">
        <b-form-input
          @change="$emit('change', value)"
          v-model="value.menuLinkTitleTemplate"
          class="form-control"
        ></b-form-input>
      </div>
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import applicationFacade from "@/api/applicationFacade";
import { CategorySchemaStateDto, CategorySchemaDto } from "@/api/clients.ts";

@Component
export default class Prices extends Vue {
  @Prop({ required: true }) readonly value!: CategorySchemaStateDto;
  @Prop({ required: true }) readonly schema!: CategorySchemaDto;
}
</script>

