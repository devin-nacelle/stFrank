import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '../storeConfig'
import SearchInput from '@/components/nacelle/SearchInput'

jest.useFakeTimers()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchInput.vue', () => {
  const store = new Vuex.Store(storeConfig())

  it('renders a search input', async () => {
    const wrapper = mount(SearchInput, {
      store,
      localVue
    })

    wrapper.vm.setQuery = jest.fn()

    // Simulate typing and triggering the keyup event
    wrapper.find('input').setValue('a')
    wrapper.trigger('keyup', { key: 'a' })

    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.setQuery).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.setQuery).toHaveBeenCalledWith({ value: 'a' })
  })
})
