<template>
  <router-view />
</template>

<script>
  export default {
    name: "Live",
    mounted() {
      // Connected Socket
      this.$socket.connect();
    }
  }
</script>
