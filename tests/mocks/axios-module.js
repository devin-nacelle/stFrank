import multivariateProduct from '../../tests/mocks/multivariateProduct'

export default {
  install (Vue) {
    Vue.prototype.$axios = (url) => {
      if (url === '/data/shop/static.json') {
        return new Promise.resolve({
          data: {
            products: [
              multivariateProduct,
              multivariateProduct,
              multivariateProduct
            ]
          }
        })
      }
    }
  }
}
