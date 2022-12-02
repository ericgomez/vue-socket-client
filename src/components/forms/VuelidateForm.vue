<template>
  <form-wrapper :validator="vuelidate.form">
    <v-container>
      <slot />
    </v-container>
  </form-wrapper>
</template>

<script>
  export default {
    name: "VuelidateForm",
    props: ["vuelidate"]
  };
</script>
