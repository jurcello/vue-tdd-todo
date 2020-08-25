<template>
  <div>
    <h2 class="mb-4">{{ title }}</h2>
    <TodoInput />
    <TodoList />
  </div>
</template>

<script>
import TodoInput from '@/components/TodoInput'
import TodoList from '@/components/TodoList'

export default {
  name: 'Todo',

  components: {
    TodoInput,
    TodoList
  },

  props: {
    title: {
      type: String,
      required: true
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
