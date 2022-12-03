<template>
  <v-list-item three-line @click="$emit('goRoom')">
    <v-list-item-content>
      <v-list-item-title>
        {{ room.name }} <span class="font-weight-bold">({{ countUsers }})</span>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ room.description }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        Autor: {{ room.owner.username }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: "RoomListItem",
    props: {
      room: {
        type: Object
      }
    },
    computed: {
      countUsers() {
        if (this.room) {
          const countUsersForRoom = this.$store.state.rooms.countUsersForLive[this.room._id];

          if (!countUsersForRoom) {
            return '0 usuarios';
          }

          if (countUsersForRoom === 1) {
            return '1 usuario';
          }
          
          return `${countUsersForRoom} usuarios`;
        }
      }
    }
  }
</script>
