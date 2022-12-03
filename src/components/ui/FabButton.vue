<template>
  <v-btn
    :color="color"
    :dark="dark"
    small
    :absolute="absolute"
    :bottom="bottom"
    :left="left"
    :right="right"
    fab
    @click="$emit('clicked')"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: "FabButton",
    props: {
      color: {
        type: String,
        default: "primary"
      },
      dark: {
        type: Boolean,
        default: true
      },
      absolute: {
        type: Boolean,
        default: true
      },
      bottom: {
        type: Boolean,
        default: false
      },
      top: {
        type: Boolean,
        default: true
      },
      left: {
        type: Boolean,
        default: false
      },
      right: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String,
        default: "mdi-plus"
      },
    }
  }
</script>
