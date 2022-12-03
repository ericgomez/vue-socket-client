const liveModule = {
  namespaced: true,
  state: {
    countLiveUsers: 0,
  },
  mutations: {
    // SocketIO Vuex mutationPrefix: listening 'SOCKET_MUTATION_' + 'name-socket-emit'
    SOCKET_MUTATION_COUNT_SOCKETS(state, count) {
      state.countLiveUsers = count;
    },
  }
};

export default liveModule;
