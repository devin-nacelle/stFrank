<template>
  <div class="column is-6">
    <product-media-select-view
      v-if="product && product.featuredMedia && product.media"
      :featuredMedia="product.featuredMedia"
      :media="product.media"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import ProductMediaSelectView from '~/components/nacelle/ProductMediaSelectView'

export default {
  components: {
    ProductMediaSelectView
  },
  props: {
    productHandle: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('user', ['locale']),
    ...mapGetters('products', [
      'getProductData',
      'getSelectedVariant',
      'getPriceForCurrency'
    ]),
    product() {
      return this.getProductData(this.productHandle).product
    },
    displayPrice() {
      return this.getPriceForCurrency({
        productHandle: this.productHandle,
        fallbackPrice: this.selectedVariant.price
      })
    },
    selectedVariant() {
      return this.getSelectedVariant(this.productHandle)
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart']),
    ...mapMutations('products', ['setSelectedVariant'])
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}
</style>
