import TodoInput from '@/components/TodoInput'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
let store

describe('The todo input component', function () {
  let wrapper

  const mutations = {
    ADD_TODO: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    store = new Vuex.Store({
      mutations
    })
    wrapper = shallowMount(TodoInput, {
      localVue,
      store
    })
  })

  async function addTodo (todoText) {
    wrapper.find('[data-testid="todo-input"]').setValue(todoText)
    await wrapper.find('[data-testid="todo-submit"]').trigger('click')
  }

  function expectMutationToHaveBeenCalledWith (item) {
    // Note the first param is an empty object. That's the state the commit will be called with.
    // We didn't initialize any state, which causes the state to be an empty object.
    expect(mutations.ADD_TODO).toHaveBeenCalledWith({}, item)
  }

  it('empties the input field when todo has been added', async () => {
    await addTodo('This is not important')
    expect(wrapper.find('[data-testid="todo-input"]').element.value).toEqual('')
  })
  it('allows for adding one todo item', async () => {
    await addTodo('My first todo item')
    expectMutationToHaveBeenCalledWith('My first todo item')
  })

  it('allows for more than one todo item to be added', async () => {
    await addTodo('My first todo item')
    await addTodo('My second todo item')
    expect(mutations.ADD_TODO).toHaveBeenCalledTimes(2)
    expectMutationToHaveBeenCalledWith('My first todo item')
    expectMutationToHaveBeenCalledWith('My second todo item')
  })
})
