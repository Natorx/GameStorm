<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './layout/header.vue';
import Footer from './layout/footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header/>
    <main class="flex-1">
      <RouterView/>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>

</style>