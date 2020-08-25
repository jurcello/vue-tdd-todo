<template>
  <div>
    <input
      type="text"
      data-testid="todo-input"
      placeholder="Add todo item..."
      class="border border-gray-300 p-1 text-blue-700"
      v-model="newTodo">
    <button
        class="px-3 py-1 text-white bg-blue-500 mb-4"
        data-testid="todo-submit"
        @click.prevent="addTodo">Add
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoInput',

  data () {
    return {
      newTodo: ''
    }
  },

  methods: {
    addTodo () {
      this.$store.commit('ADD_TODO', this.newTodo)
      this.newTodo = ''
    }
  }
}
</script>
