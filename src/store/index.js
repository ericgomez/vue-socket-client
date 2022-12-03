import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import authModule from "./auth";
import roomsModule from "./rooms";
import liveModule from "./live";
import { set } from '../utils/vuex';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});


export default new Vuex.Store({
  state: {
    processing: { show: false, message: null },
    notification: { show: false, message: null, color: 'success', timeout: 6000 },
    privateNotification: { show: false, message: null, color: 'success', link: null, timeout: 6000 },
  },
  mutations: {
    // use custom utils set
    setProcessing: set('processing'),
    setNotification: set('notification'),
    setPrivateNotification: set('privateNotification'),
    // SocketIO Vuex mutationPrefix: listening 'SOCKET_MUTATION_' + 'name-socket-emit'
    SOCKET_MUTATION_USER_JOINED(state, data) {
      state.notification = {
        show: true,
        message: data.message,
        color: "info"
      };
    },
    // SocketIO Vuex mutationPrefix: listening 'SOCKET_MUTATION_' + 'name-socket-emit'
    SOCKET_MUTATION_USER_LEAVE_ROOM(state, data) {
      state.notification = {
        show: true,
        message: data.message,
        color: "warning"
      };
    },
    // SocketIO Vuex mutationPrefix: listening 'SOCKET_MUTATION_' + 'name-socket-emit'
    SOCKET_MUTATION_NEW_ROOM_CREATED(state, data) {
      const room = data.room;

      state.notification = {
        show: true,
        message: `El usuario ${room.owner.username} ha creado la sala ${room.name}`,
        color: "success"
      };
    },
    // SocketIO Vuex mutationPrefix: listening 'SOCKET_MUTATION_' + 'name-socket-emit'
    SOCKET_MUTATION_SEND_INVITATION_TO_PRIVATE_ROOM(state, data) {
      const link = {
        url: `/room/${data.room}/private`,
        text: "Acceder ahora!"
      };

      state.privateNotification = {
        show: true,
        data,
        message: data.message,
        color: "deep-orange accent-4",
        link
      };
    },
    // SocketIO Vuex mutationPrefix: listening 'SOCKET_MUTATION_' + 'name-socket-emit'
    SOCKET_MUTATION_USER_JOINED_TO_PRIVATE_ROOM(state, message) {
      state.notification = {
        show: true,
        message,
        color: "success"
      };
    }
  },
  modules: {
    auth: authModule,
    rooms: roomsModule,
    live: liveModule
  },
  plugins: [vuexLocal.plugin]
});
