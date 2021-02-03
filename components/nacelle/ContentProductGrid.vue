<template>
  <div class="product-grid section nacelle">
    <div class="container">
      <slot name="header" :title="title">
        <component :is="titleTag" class="title has-text-centered">
          {{ title }}
        </component>
      </slot>
      <slot name="products" :products="products" :columns="columns">
        <product-grid :products="products" :columns="columns" />
      </slot>
    </div>
  </div>
</template>

<script>
import ProductGrid from '~/components/nacelle/ProductGrid'

export default {
  components: {
    ProductGrid
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    collectionHandle: {
      type: String,
      default: ''
    },
    columns: {
      type: Number,
      default: 4
    },
    titleTag: {
      type: String,
      default: 'h3'
    }
  },
  data() {
    return {
      products: []
    }
  },
  async fetch() {
    this.products = await this.$nacelle.data.collectionPage({
      handle: this.collectionHandle,
      itemsPerPage: this.columns,
      paginate: true
    })
  }
}
</script>

<style></style>
