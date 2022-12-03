<template>
  <v-col cols="12" class="pa-1">
    <v-card class="mx-auto">
      <v-toolbar dark class="warning font-weight-medium">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text style="height: 40vh; overflow-y: scroll">
        <p v-for="(message, index) in messagesInRoom" :key="index">{{ message }}</p>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row>
          <v-col cols="10">
            <v-text-field v-model="message" />
          </v-col>
          <v-col cols="2">
            <v-btn class="mt-3" @click="sendMessage" color="warning">Enviar</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "RoomPrivateChat",
    props: ["room"],
    data() {
      return {
        message: null
      }
    },
    computed: {
      title() {
        const me = 'tú';
        if (!this.$store.getters['auth/user'] || !this.room) return;

        const user1 = this.room.usersInRoom[0].username === this.$store.getters['auth/user'].username ? me : this.room.usersInRoom[0].username;

        const user2 = this.room.usersInRoom[1].username === this.$store.getters['auth/user'].username ? me : this.room.usersInRoom[1].username;

        const roomName = this.room.name;
        if (user1 === me) {
          return `Conversación privada entre ${user1} y ${user2} en la sala ${roomName}`;
        }
        return `Conversación privada entre ${user2} y ${user1} en la sala ${roomName}`;
      },
      messagesInRoom() {
        return this.$store.getters['rooms/messagesInPrivateRoom'](
          this.$route.params.id, this.$store.getters['auth/user'].username
        );
      }
    },
    methods: {
      sendMessage() {
        this.$emit('sendMessage', this.message);
        this.message = "";
      }
    }
  }
</script>
