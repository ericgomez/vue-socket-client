<template>
  <vuelidate-form-slot :vuelidate="$v">
    <v-layout row wrap>
      <v-flex xs12>
        <vuelidate-form-group name="username">
          <template slot-scope="{ attrs }">
            <v-text-field
              v-bind="attrs"
              v-model="form.username"
              label="Usuario"
              @blur="$v.form.username.$touch()"
            />
          </template>
        </vuelidate-form-group>
      </v-flex>
      <v-flex xs12 mb-2>
        <vuelidate-form-group name="password">
          <template slot-scope="{ attrs }">
            <v-text-field
              v-bind="attrs"
              v-model="form.password"
              name="password"
              label="Contraseña"
              type="password"
              @blur="$v.form.password.$touch()"
            />
          </template>
        </vuelidate-form-group>
      </v-flex>
    </v-layout>
  </vuelidate-form-slot>
</template>

<script>
  import {minLength, required} from "vuelidate/lib/validators";

  export default {
    name: "AuthForm",
    data() {
      return {
        form: {
          username: "esgomez",
          password: "123456"
        }
      };
    },
    validations: {
      form: {
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(6) }
      }
    }
  }
</script>
