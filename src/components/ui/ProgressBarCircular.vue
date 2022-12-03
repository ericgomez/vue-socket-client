<template>
  <v-dialog
    persistent
    v-model="processing"
    content
    content-class="centered-dialog"
  >
    <v-container ma-0 pa-0 fluid fill-height>
      <v-layout column justify-center="" align-center="">
        <v-progress-circular indeterminate :size="70" :width="7" color="red" />
        <h1 class="white--text" v-text="processing.message" />
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
  export default {
    name: "ProgressBarCircular",
    props: ["processing"]
  };
</script>

<style>
  .dialog.centered-dialog,
  .v-dialog.centered-dialog {
    background: transparent;
    box-shadow: none;
    border-radius: 6px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    color: whitesmoke;
  }
</style>
