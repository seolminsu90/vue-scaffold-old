<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, idx) in role" :key="idx">{{ item }}</li>
    </ul>
    <button type="button" @click="addAdminRole">AUTH STORE ADMIN ROLE !!</button>
    <p>쿠키 : {{ getCookie("test") }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const authStore = 'authStore'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      role: ['TEST'],
    };
  },
  mounted() {
    this.setCookie('test','this is test Cookie value', 30000)
  },
  computed: {
    ...mapGetters(authStore, {
      storeRoles: 'GET_AUTH',
    }),
    setAuth() {
      this.GET_AUTH
    },
  },
  methods: {
    ...mapActions(authStore, ['AC_AUTH']),
    addAdminRole() {
      const payload = {
        roles: ['ADMIN', 'USER', 'ALL'],
      }
      this.AC_AUTH(payload)
    },
  },
  watch: {
    storeRoles(val) {// ...mapGetters Watch
      this.role = val
    },
  },
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
