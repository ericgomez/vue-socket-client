import Vue from "vue";

const roomsModule = {
  namespaced: true,
  state: {
    rooms: [],
    countUsersForLive: {},
    privateRooms: {},
    usersInRoom: {},
    room: null
  },
  mutations: {
    setRoom(state, room) {
      state.room = room;
    },
    SOCKET_MUTATION_ROOMS_LOADED(state, data) {
      state.rooms = data.rooms;
    },
    SOCKET_MUTATION_USERS_IN_ROOM(state, data) {
      // Add reactive properties to a nested object using the Vue.set(object, propertyName, value)
      Vue.set(state.room, 'users', data);
    },
    SOCKET_MUTATION_NEW_MESSAGE(state, message) {
      let messages = state.room.messages;
      if (!messages) {
        messages = [message];
      } else {
        messages.push(message);
      }
      Vue.set(state.room, 'messages', messages);
    },
    SOCKET_MUTATION_START_PRIVATE_ROOM(state, data) {
      // Add reactive properties to a nested object using the Vue.set(object, propertyName, value)
      Vue.set(state.privateRooms, data.room, {
        name: data.data.name,
        description: data.data.description,
        usersInRoom: data.usersInRoom
      });
    },
    SOCKET_MUTATION_NEW_PRIVATE_MESSAGE(state, newMessage) {
      let messages = state.privateRooms[newMessage.room].messages;

      if (!messages) {
        messages = [newMessage];
      } else {
        messages.push(newMessage);
      }

      // Add reactive properties to a nested object using the Vue.set(object, propertyName, value)
      Vue.set(state.privateRooms[newMessage.room], 'messages', messages);
    },
    SOCKET_MUTATION_USER_LEAVE_PRIVATE_ROOM(state, room) {
      state.privateRooms[room] = null;
    },
    SOCKET_MUTATION_COUNT_USERS_IN_ROOM(state, data) {
      // Add reactive properties to a nested object using the Vue.set(object, propertyName, value)
      Vue.set(state.countUsersForLive, data.room, data.countUsers);
    }
  },
  getters: {
    messagesInRoom(state) {
      // send parameter in getter messagesInRoom(username) as if it were a function
      return function (username) {
        let newMessages = [];

        if (!state.room || !state.room.messages) return [];
        state.room.messages.forEach(m => {
          const user = m.user === username ? 'Yo' : m.user;
          const message = `${user}: ${m.message}`;
          newMessages.push(message);
        });

        return newMessages;
      };
    },
    messagesInPrivateRoom(state) {
      // send parameter in getter messagesInPrivateRoom(username) as if it were a function
      return function (room, username) {
        let newMessages = [];

        if (!state.privateRooms[room] || !state.privateRooms[room].hasOwnProperty('messages')) return [];
        state.privateRooms[room].messages.forEach(m => {
          const user = m.user === username ? 'Yo' : m.user;
          const message = `${user}: ${m.message}`;
          newMessages.push(message);
        });

        return newMessages;
      };
    }
  }
};

export default roomsModule;
