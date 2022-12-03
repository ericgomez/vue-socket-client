<template>
  <v-container fluid v-if="$store.state.auth.token">
    <fab-button color="primary" icon="mdi-arrow-left-bold" @clicked="$router.push({ name: 'Rooms' })" />
    <v-alert color="red" class="title" dark v-if="!roomData">
      Esperando a todos los participantes
    </v-alert>
    <v-row no-gutters v-else class="mt-10">
      <room-private-chat @sendMessage="sendMessage" :room="roomData" />
    </v-row>
  </v-container>
</template>

<script>
  import FabButton from "../components/ui/FabButton";
  import RoomPrivateChat from "../components/rooms/RoomPrivateChat";
  
  export default {
    name: "PrivateRoom",
    components: {RoomPrivateChat, FabButton},
    mounted() {
      this.roomId = this.$route.params.id;
    },
    data() {
      return {
        roomId: null
      }
    },
    methods: {
      sendMessage(message) {
        this.$socket.emit("rooms/message", {
          room: this.$route.params.id,
          message,
          privateRoom: true
        })
      }
    },
    computed: {
      roomData() {
        return this.$store.state.rooms.privateRooms[this.$route.params.id];
      }
    },
    beforeDestroy() {
      this.$socket.emit("rooms/leavePrivateRoom", this.roomId);
    }
  }
</script>
