<template>
  <v-snackbar
    :vertical="true"
    :bottom="true"
    :right="true"
    v-if="loaded"
    v-model="privateNotification.show"
    :color="privateNotification.color"
    :timeout="privateNotification.timeout || 30000"
  >
    <span class="title" v-html="privateNotification.message" />
    <v-btn v-if="privateNotification.link" @click="redirect">
      {{ privateNotification.link.text }}
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "PrivateSnackBar",
    mounted() {
      this.$store.commit("setPrivateNotification", { show: false });
      
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
      ...mapState(["privateNotification"])
    },
    methods: {
      redirect() {
        this.$router.push(this.privateNotification.link.url);
        this.$socket.emit('rooms/joinPrivateRoom', this.privateNotification.data);
        this.$store.commit("setPrivateNotification", { show: false });
      }
    }
  };
</script>
