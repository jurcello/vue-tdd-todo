import { shallowMount } from '@vue/test-utils'
import Todo from '@/components/Todo'

describe('The Todo.vue component', () => {
  it('Displays the title when passed as a prop', () => {
    const wrapper = shallowMount(Todo, {
      propsData: {
        title: 'A random title'
      }
    })
    expect(wrapper.text()).toMatch('A random title')
    const wrapper2 = shallowMount(Todo, {
      propsData: {
        title: 'Another random one'
      }
    })
    expect(wrapper2.text()).toMatch('Another random one')
  })
})
