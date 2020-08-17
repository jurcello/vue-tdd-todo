import todo from '@/store/todo.js'

function createTodo (description, isDone) {
  return {
    description: description,
    done: isDone
  }
}

describe('The todo store', () => {
  it('stores the todos at the todos key', () => {
    const newState = todo.state()
    expect(newState).toEqual({ todos: [] })
  })

  describe(', the mutations', () => {
    let state

    beforeEach(() => {
      state = todo.state()
    })
    it('a todo can be added using the ADD_TODO mutation', () => {
      todo.mutations.ADD_TODO(state, 'A random todo description')
      expect(state.todos).toEqual([
        createTodo('A random todo description', false)
      ])
    })
    it('the order in which the todos are added are preserved in the state', () => {
      todo.mutations.ADD_TODO(state, 'First todo')
      todo.mutations.ADD_TODO(state, 'Second todo')
      expect(state.todos).toEqual([
        createTodo('First todo', false),
        createTodo('Second todo', false)
      ])
    })
    it('has a mutation to toggle the status of a todo', () => {
      state = {
        todos: [
          createTodo('First todo', false),
          createTodo('Todo to toggle', false)
        ]
      }
      todo.mutations.TOGGLE_TODO(state, createTodo('Todo to toggle', false))
      expect(state.todos).toEqual([
        createTodo('First todo', false),
        createTodo('Todo to toggle', true)
      ])
    })
  })
  describe('the getters', () => {
    const state = {
      todos: [
        createTodo('First todo', false),
        createTodo('Second todo', false)
      ]
    }
    const todos = todo.getters.todos(state)
    expect(todos).toEqual([
      createTodo('First todo', false),
      createTodo('Second todo', false)
    ])
  })
})
