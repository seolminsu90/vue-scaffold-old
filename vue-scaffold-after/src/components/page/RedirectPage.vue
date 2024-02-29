<template>
  <span>Redirecting...</span>
  <pre>{{result}}</pre>
</template>

<script>
export default {
  data(){
    return {
      result: ''
    }
  },
  async created() {
    this.oauthLogin(this.$route.query)
  },
  methods: {
    async oauthLogin(query){
      try{
        const res = await $axios.post("http://localhost:8080/oauth/login", { code: query.code, })
        this.result = res
      } catch(e){
        this.result = e.response
      }
      
      //this.$router.replace('/')
    }
  },
};
</script>
