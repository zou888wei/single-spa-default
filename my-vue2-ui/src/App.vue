<template>
  <div>
    我叫{{ userName }}
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.getters['test/userName']
    }
  },
  created() {
    window.addEventListener('editName', res => {
      console.log(res, 222)
      this.$store.dispatch('test/setUserName', res.detail)
    })
  }
}
</script>

<style>
#content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
