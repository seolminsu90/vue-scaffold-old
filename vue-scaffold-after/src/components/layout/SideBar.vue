<template>
  <div class="collapse collapseSidebar collapse-horizontal bg-primary show">
    <div id="sidebar-wrapper">
      <div class="sidebar-heading">
        <h1>Title</h1>
        <h3>Sub title</h3>
        <h5>description</h5>
      </div>

      <SideBarCollapse :menus="menus" :menuFunction="menuFunction" :roles="roles"/>
    </div>
  </div>
</template>

<script>
import { routes } from '@/common/router/index.js'
import SideBarCollapse from './SideBarCollapse.vue'
export default {
  name: 'SideBar',
  components: {
    SideBarCollapse
  },
  mounted() {
    this.roles = this.GetAuth
    this.menuFind(this.menus)
    if (!this.find) {
      this.$router.push('/')
    }
  },
  watch: {
    $route() {
      this.menuOff(this.menus)
      this.menuFind(this.menus)
    }
  },
  methods: {
    menuOff(menus){
      menus.forEach(m => {
        m.active = false
        m.show = false
        if (m.children !== undefined) this.menuOff(m.children)
      })
    },
    menuFind(menus) {
      let m = menus.find(m => window.location.pathname.startsWith(m.fullpath))
      if (m == undefined) return
      if (m.children == undefined) {
        this.find = m.active = true
        return
      }
      m.show = true
      this.menuFind(m.children)
    },
    menuFunction(menu) {
      if (menu.children === undefined) {
        this.$router.push(menu.fullpath)
      }
    }
  },
  data() {
    return {
      find: false,
      roles: [],
      menus: routes.find(route => route.name === 'home')['children'] // route.index.js 참조 -- 비슷한 형태면 꼭 route와 같이 안써도 된다.
    }
  }
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  width: 12vw;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem .5rem;
  font-size: 1.2rem;
}

.sidebar-heading h1,
.sidebar-heading h2,
.sidebar-heading h3,
.sidebar-heading h4,
.sidebar-heading h5 {
  color: #fff;
}

#sidebar-wrapper .list-group {
  width: 100%;
  text-indent: 0.2rem;
}

.list-group-item {
  padding: 0;
  border: none;
  position: relative;
  line-height: 1.7rem;
}

.list-group-item.active {
  background-color: rgb(230, 241, 255) !important;
  color: black !important;
}

.collapsing.collapse-horizontal {
  transition: width .5s ease;
}

.list-group-item .fa-angle-down {
  position: absolute;
  right: 5px;
  top: 0px;
  line-height: 1.7rem;
}
</style>
