<template>
  <div class="d-flex">
    <SideBar />
    <div class="flex-grow-1" id="page-content-wrapper">
      <NavBar />
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue"
import SideBar from "@/components/layout/SideBar.vue"
export default {
  name: "HomePage",
  data() {
    return {}
  },
  components: { NavBar, SideBar },
  methods: {},
};
</script>
<style scoped></style>
