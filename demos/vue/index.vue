<template>
  <div class="title">Hello world {{ username }}</div>
</template>

<script setup>
let username = 'sonofmagic'
</script>

<style scoped>
.title {
  font-size: 20px;
  color: gray;
}
</style>