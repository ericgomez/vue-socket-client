import Vue from "vue";
import store from "../store";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(process.env.VUE_APP_SOCKET_URL, {
    query: `token=${store.state.auth.token}`,
  }),
  // Use vuex in SocketIO
  vuex: {
    store,
    actionPrefix: 'SOCKET_ACTION_', // listening 'SOCKET_ACTION_' + 'name-socket-emit'
    mutationPrefix: 'SOCKET_MUTATION_' // listening 'SOCKET_MUTATION_' + 'name-socket-emit'
  }
}));
