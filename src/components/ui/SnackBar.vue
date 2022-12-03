<template>
  <v-snackbar
    :vertical="true"
    :bottom="true"
    :right="true"
    v-if="loaded"
    v-model="notification.show"
    :color="notification.color"
    :timeout="notification.timeout || 10000"
  >
    <span v-html="notification.message" />
  </v-snackbar>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "SnackBar",
    mounted() {
      this.$store.commit("setNotification", { show: false });
      
      setTimeout(() => {
        this.loaded = true;
      }, 500);
    },
    data() {
      return {
        loaded: false
      };
    },
    computed: {
      ...mapState(["notification"])
    }
  };
</script>
