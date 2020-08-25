<template>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TodoList',

  computed: {
    ...mapGetters(['todos'])
  },

  methods: {
    toggle (todo) {
      this.$store.commit('TOGGLE_TODO', todo)
    }
  }
}
</script>
