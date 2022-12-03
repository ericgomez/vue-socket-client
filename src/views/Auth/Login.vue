<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12 blue-grey darken-4" dark>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Iniciar sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>

            <!-- login form -->
            <auth-form ref="loginForm" />
            <!-- ./login form -->

            <v-btn @click.native="submit" large block color="primary">Acceder</v-btn>
            <v-btn
              class="mt-2"
              @click.native="$router.push({ name: 'Register' })"
              block
              large
            >
              Crear una cuenta
            </v-btn>
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
    name: "LoginPage",
    components: { AuthForm },
    methods: {
      ...mapActions({
        login: "auth/login"
      }),
      async submit() {
        const loginFormRef = this.$refs.loginForm;

        loginFormRef.$v.$touch();
        
        if (loginFormRef.$v.$anyError) return;

        await this.login(loginFormRef.form);
      }
    }
  };
</script>
