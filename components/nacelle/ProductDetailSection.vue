<template>
  <div :class="classes">
    <product-media-select-view
      v-if="isProductImage"
      :featuredMedia="product.featuredMedia"
      :media="product.media"
    />
    <product-detail-description
      v-if="isDetailDescription"
      :productHandle="product.handle"
    />
    <div v-if="isProductMetaDetails" class="product-meta-details">
      <h4 class="title is-4">What You're Getting</h4>
      <div class="content">
        <p>
          Run a manual sweep of anomalous airborne or electromagnetic readings.
          Radiation levels in our atmosphere have increased by 3,000 percent.
          Electromagnetic and subspace wave fronts approaching synchronization.
          What is the strength of the ship's deflector shields at maximum
          output? The wormhole's size and short period would make this a local
          phenomenon. Do you have sufficient data to compile a holographic
          simulation?
        </p>
      </div>
    </div>
    <div v-if="isProductMetaMission" class="product-meta-mission">
      <h4 class="title is-4">Our Products</h4>
      <div class="content">
        <p>
          It indicates a synchronic distortion in the areas emanating triolic
          waves. The cerebellum, the cerebral cortex, the brain stem, the entire
          nervous system has been depleted of electrochemical energy.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductMediaSelectView from '~/components/nacelle/ProductMediaSelectView'
import ProductDetailDescription from '~/components/nacelle/ProductDetailDescription'

export default {
  components: {
    ProductMediaSelectView,
    ProductDetailDescription
  },
  props: {
    section: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isProductImage() {
      return (
        this.section === 'product-image' &&
        this.product &&
        this.product.featuredMedia &&
        this.product.media
      )
    },
    isDetailDescription() {
      return (
        this.section === 'product-description' &&
        this.product &&
        this.product.handle
      )
    },
    isProductMetaDetails() {
      return this.section === 'product-meta-details'
    },
    isProductMetaMission() {
      return this.section === 'product-meta-mission'
    }
  }
}
</script>

<style lang="scss"></style>
