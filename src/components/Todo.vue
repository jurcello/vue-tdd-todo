<template>
  <div>
    <h2 class="mb-4">{{ title }}</h2>
    <input
        type="text"
        data-testid="todo-input"
        placeholder="Add todo item..."
        class="border border-gray-300 p-1 text-blue-700"
        v-model="newTodo">
    <button
        class="px-3 py-1 text-white bg-blue-500 mb-4"
        data-testid="todo-submit"
        @click.prevent="addTodo">Add</button>
    <ul data-testid="todos" class="text-left">
      <li
          v-for="(todo, todoKey) of todos"
          :data-testid="`todo-${todoKey}`"
          :data-done="todo.done"
          :key="todoKey"
          class="block mb-3"
          :class="todo.done ? 'done' : ''"
      >
        <span
            :data-testid="`todo-${todoKey}-toggle`"
            @click.prevent="toggle(todo)"
            class="checkbox"
            :class="todo.done ? 'done' : ''"
        > {{ todo.done ? "Done" : "Mark done" }}</span>
        {{ todo.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Todo',

  props: {
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(['todos'])
  },

  data () {
    return {
      newTodo: ''
    }
  },

  methods: {
    addTodo () {
      this.$store.commit('ADD_TODO', this.newTodo)
      this.newTodo = ''
    },
    toggle (todo) {
      this.$store.commit('TOGGLE_TODO', todo)
    }
  }

}
</script>
<style lang="css">
li.done {
  @apply line-through;
}
.checkbox {
  @apply w-6 h-6 overflow-hidden inline-block border-4 bottom-0 relative mr-2 rounded-full cursor-pointer;
  text-indent: -1000px;
  top: 5px;
}

.checkbox.done {
  @apply bg-blue-500;
}
</style>
