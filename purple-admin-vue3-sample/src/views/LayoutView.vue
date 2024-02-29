
<template>
  <HeaderNav />
  <div class="container-fluid page-body-wrapper">
    <SideBar />
    <div class="main-panel">
      <div class="content-wrapper">
        <RouterView />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { RouterView } from 'vue-router'
import HeaderNav from './layout/HeaderNav.vue'
import SideBar from './layout/SideBar.vue'
</script>
  
  
<style scoped></style>
  