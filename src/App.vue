<template>
  <div id="app" class="container max-w-md">
    <h1>Todo</h1>
    <Todo title="My List"/>
  </div>
</template>

<script>
import Todo from '@/components/Todo'

export default {
  name: 'App',

  components: {
    Todo
  }
}
</script>

<style>
#app {
  @apply mx-auto text-center;
}

h1 {
  @apply text-2xl font-bold;
}
</style>
