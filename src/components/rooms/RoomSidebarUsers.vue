<template>
  <v-col cols="4" class="pa-1">
    <v-card class="mx-auto">
      <v-toolbar dark class="warning font-weight-medium">
        <v-toolbar-title>Usuarios</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-0" style="height: 47vh; overflow-y: scroll">
        <v-list color="blue-grey darken-4" dark style="border-radius: 0">
          <v-list-item
            @click="$emit('userClicked', user)"
            v-for="user in $store.state.rooms.room.users"
            :key="user._id"
          >
            <span
              class="subtitle-1 font-weight-bold"
              :style="{color: user.username === $store.getters['auth/user'].username ? 'red' : 'white'}"
            >
              {{ user.username }}
            </span>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "RoomSidebarUsers"
  }
</script>
