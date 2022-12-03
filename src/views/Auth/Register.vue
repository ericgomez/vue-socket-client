<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12 blue-grey darken-4" dark>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Crear una cuenta</v-toolbar-title>
          </v-toolbar>
          <v-card-text>

            <!-- register form -->
            <auth-form ref="registerForm" />
            <!-- ./register form -->

            <v-btn @click.native="submit" large block color="primary">Regístrarme</v-btn>
            <v-btn
              class="mt-2"
              @click.native="$router.push({ name: 'Login' })"
              large
              block
            >Ya tengo una cuenta</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from "vuex";
  import AuthForm from "../../components/forms/AuthForm";

  export default {
    name: "Register",
    components: { AuthForm },
    methods: {
      ...mapActions({
        register: "auth/register"
      }),
      async submit() {
        const registerFormRef = this.$refs.registerForm;

        registerFormRef.$v.$touch();
        
        if (registerFormRef.$v.$anyError) return;

        await this.register(registerFormRef.form);
      }
    }
  };
</script>
