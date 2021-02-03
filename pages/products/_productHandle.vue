<!--
/****
/* Individual products are loaded with the getProduct mixin.
/* For instructions related to connecting your invetory to
/* Nacelle, please refer to:
/*
/* https://docs.getnacelle.com/getting-started.html#_2-product-settings
/****
-->
<template>
  <div>
    <div class="container">
      <div class="product columns">
        <section class="section product-image column is-6 product">
          <product-detail-section :product="product" :section="sections[0]" />
        </section>
        <section class="column is-5 is-offset-1">
          <product-detail-section :product="product" :section="sections[1]" />
        </section>
      </div>
    </div>
    <section class="section product-meta" v-if="product">
      <div class="container">
        <div class="columns">
          <section class="column is-7">
            <product-detail-section :product="product" :section="sections[2]" />
          </section>
          <section class="column is-4 is-offset-1 highlight">
            <product-detail-section :product="product" :section="sections[3]" />
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import getProduct from '~/mixins/getProduct'
import ProductDetailSection from '~/components/nacelle/ProductDetailSection'
import productMetafields from '~/mixins/productMetafields'
import viewEvent from '~/mixins/viewEvent'
import jsonld from '~/mixins/jsonld'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ProductDetailSection
  },
  mixins: [
    getProduct(),
    productMetafields,
    viewEvent('product'),
    jsonld('product')
  ],
  data() {
    return {
      template: null
    }
  },
  async fetch() {
    this.template = await this.$nacelle.content({
      handle: 'pdp-template',
      type: 'productDetailTemplate'
    })
  },
  computed: {
    ...mapGetters('space', ['getMetatag']),

    sections() {
      if (this.template && this.template.sections) {
        return this.template.sections.map(section => section.fields.name)
      }

      return []
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart'])
  },
  head() {
    if (this.product) {
      const properties = {}
      const meta = []
      const title = this.getMetatag('title')

      if (this.product.title) {
        let fullTitle = this.product.title

        if (title) {
          fullTitle = `${fullTitle} | ${title.value}`
        }

        properties.title = fullTitle
        meta.push({
          hid: 'og:title',
          property: 'og:title',
          content: fullTitle
        })
      }

      if (this.product.description) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: this.product.description
        })
        meta.push({
          hid: 'og:description',
          property: 'og:description',
          content: this.product.description
        })
      }

      if (this.product.featuredMedia) {
        meta.push({
          hid: 'og:image',
          property: 'og:image',
          content: this.product.featuredMedia.src
        })
      }

      return {
        ...properties,
        meta
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}

.product-meta .column {
  padding-bottom: 2rem;

  @media screen and (min-width: 769px) {
    padding-top: 3rem;
    padding-bottom: 0;
  }
}

.column.highlight {
  background-color: #f5f5f5;

  @media screen and (min-width: 769px) {
    padding: 3rem;
  }
}
</style>
