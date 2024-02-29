<template>
  <SideBar />
  <NavBar />
  <ContentRoute />
</template>

<script>
import ContentRoute from '@/views/layout/ContentRoute.vue';
import SideBar from '@/views/layout/SideBar.vue';
import NavBar from '@/views/layout/NavBar.vue';


export default {
  name: 'App',
  components: {
    SideBar,
    NavBar,
    ContentRoute
  }
}

</script>
