<template>
  <v-container fluid>
    <new-room-modal :dialog="dialog" @close="dialog = false" @submit="createNewRoom" />
    <fab-button color="warning" @clicked="dialog = true" />

    <v-card class="mx-auto" tile v-if="$store.state.rooms.rooms.length">
      <room-list-item
        v-for="room in $store.state.rooms.rooms"
        :key="room._id"
        :room="room"
        @goRoom="goRoom(room)"
      />
    </v-card>
    
    <v-alert v-else dark color="red" class="title">No hay salas disponibles, ¡crea una!</v-alert>
  </v-container>
</template>

<script>
  import NewRoomModal from "../components/rooms/NewRoomModal";
  import FabButton from "../components/ui/FabButton";
  import RoomListItem from "../components/rooms/RoomListItem";

  export default {
    name: "Rooms",
    components: { RoomListItem, FabButton, NewRoomModal },
    mounted() {
      this.$socket.emit('rooms/all');
    },
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      async createNewRoom(data) {
        await this.$socket.emit('rooms/create', data);
      },
      goRoom(room) {
        this.$store.commit("rooms/setRoom", room, { root: true });
        this.$router.push({ name: "Room", params: { id: room._id }});
      }
    }
  }
</script>
