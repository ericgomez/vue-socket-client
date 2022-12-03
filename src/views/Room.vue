<template>
  <v-container fluid v-if="$store.state.auth.token">
    <fab-button color="primary" icon="mdi-arrow-left-bold" @clicked="$router.push({ name: 'Rooms' })" />
    <v-row no-gutters class="mt-10">
      <room-chat @sendMessage="sendMessage" />
      <room-sidebar-users @userClicked="userClicked" />
      <new-room-modal :dialog="dialog" @submit="createPrivateRoom" @close="dialog = false" />
    </v-row>
  </v-container>
</template>

<script>
  import FabButton from "../components/ui/FabButton";
  import RoomChat from "../components/rooms/RoomChat";
  import RoomSidebarUsers from "../components/rooms/RoomSidebarUsers";
  import NewRoomModal from "../components/rooms/NewRoomModal";

  export default {
    name: "Room",
    components: {NewRoomModal, RoomSidebarUsers, RoomChat, FabButton},
    mounted() {
      const roomId = this.$route.params.id;
      this.$socket.emit("rooms/join", roomId);
    },
    data() {
      return {
        dialog: false,
        userForPrivateChat: null
      }
    },
    methods: {
      userClicked(user) {
        if(user.id !== this.$store.getters['auth/user'].id) {
          this.userForPrivateChat = user;
          this.dialog = true;
        }
      },
      createPrivateRoom(data) {
        data.user = this.userForPrivateChat;
        data.currentRoom = this.$route.params.id;
        data.roomId = `${Date.now()}-${data.name}-${data.user.id}-${this.$store.getters['auth/user'].id}`;

        this.$socket.emit('rooms/createPrivateRoom', data);
        
        this.$router.push({ name: "PrivateRoom", params: { id: data.roomId }})
      },
      sendMessage(message) {
        this.$socket.emit('rooms/message', { message, room: this.$route.params.id });
      }
    },
    beforeDestroy() {
      this.$socket.emit("rooms/leave", this.$store.state.rooms.room._id);
    }
  }
</script>
