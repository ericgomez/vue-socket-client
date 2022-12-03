<template>
  <v-app>
    <v-app-bar app class="purple darken-2" dark v-if="$store.state.auth.token">
      <div class="d-flex align-center">
        <span class="display-1">Chat APP</span>
      </div>
      <v-spacer />
      <span class="title secondary pa-3">Hola {{ $store.getters['auth/user'].username }}</span>
      <span class="title pa-3 warning font-weight-bold ml-4">{{ totalSockets }}</span>
      <v-btn right text @click="exit">Salir</v-btn>
    </v-app-bar>

    <v-content class="blue-grey darken-4">

      <snack-bar />
    
      <private-snack-bar />
      <div id="app">
        <router-view />
        <progress-bar-circular
          v-if="$store.state.processing.show"
          :processing="$store.state.processing"
        />
    
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import { mapActions } from "vuex";
  import SnackBar from "./components/ui/SnackBar";
  import ProgressBarCircular from "./components/ui/ProgressBarCircular";
  import PrivateSnackBar from "./components/ui/PrivateSnackBar";

  export default {
    name: "App",
    components: { PrivateSnackBar, ProgressBarCircular, SnackBar },
    async mounted() {
      // listening EventBus Global
      this.$rootBus.$on("routerPush", route => {
        this.$router.push(route);
      })
    },
    methods: {
      ...mapActions({
        logout: "auth/logout"
      }),
      exit() {
        this.$socket.emit('logout', this.$store.getters['auth/user'].username);
        this.$socket.disconnect();
        this.logout();
      }
    },
    computed: {
      totalSockets() {
        const count = this.$store.state.live.countLiveUsers;
        return count > 1 ? `${count} usuarios conectados!` : `${count} usuario conectado!`;
      }
    }
  };
</script>
