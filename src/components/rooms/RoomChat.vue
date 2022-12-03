<template>
  <v-col cols="8" class="pa-1">
    <v-card class="mx-auto">
      <v-toolbar dark class="warning font-weight-medium">
        <v-toolbar-title>{{ $store.state.rooms.room.name }}</v-toolbar-title>
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
    name: "RoomChat",
    data() {
      return {
        message: null
      }
    },
    computed: {
      messagesInRoom() {
        return this.$store.getters['rooms/messagesInRoom'](this.$store.getters['auth/user'].username);
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
