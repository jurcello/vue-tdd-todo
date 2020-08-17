import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Todo from '@/components/Todo'
import { createStore } from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)
let store

describe('The Todo.vue component', () => {
  beforeEach(() => {
    store = createStore()
  })
  it('Displays the title when passed as a prop', () => {
    const wrapper = shallowMount(Todo, {
      localVue,
      store,
      propsData: {
        title: 'A random title'
      }
    })
    expect(wrapper.text()).toMatch('A random title')
    const wrapper2 = shallowMount(Todo, {
      localVue,
      store,
      propsData: {
        title: 'Another random one'
      }
    })
    expect(wrapper2.text()).toMatch('Another random one')
  })
  describe('adding todo items', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(Todo, {
        localVue,
        store,
        propsData: {
          title: 'My list'
        }
      })
    })

    async function addTodo (todoText) {
      wrapper.find('[data-testid="todo-input"]').setValue(todoText)
      await wrapper.find('[data-testid="todo-submit"]').trigger('click')
    }

    function elementText (testId) {
      return wrapper.find(`[data-testid="${testId}"]`).text()
    }

    it('allows for adding one todo item', async () => {
      await addTodo('My first todo item')
      expect(elementText('todos')).toContain('My first todo item')
    })
    it('allows for more than one todo item to be added', async () => {
      await addTodo('My first todo item')
      await addTodo('My second todo item')
      expect(elementText('todos')).toContain('My first todo item')
      expect(elementText('todos')).toContain('My second todo item')
    })
    it('empties the input field when todo has been added', async () => {
      await addTodo('This is not important')
      expect(wrapper.find('[data-testid="todo-input"]').element.value).toEqual('')
    })
    it('displays the items in the order they are entered', async () => {
      await addTodo('First')
      await addTodo('Second')
      expect(elementText('todo-0')).toMatch('First')
      expect(elementText('todo-1')).toMatch('Second')
    })
    it('items can be marked as done by clicking an element before the item.', async () => {
      function itemIsDone (itemId) {
        return wrapper.find(`[data-testid="todo-${itemId}"]`).attributes('data-done') === 'true'
      }

      await addTodo('First')
      await addTodo('Second')

      expect(itemIsDone(0)).toBe(false)
      await wrapper.find('[data-testid="todo-0-toggle"]').trigger('click')
      expect(itemIsDone(0)).toBe(true)
    })
  })
})
