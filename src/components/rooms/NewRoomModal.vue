<template>
  <v-dialog :value="dialog" persistent hide-overlay dark max-width="600px">
    <v-card class="lighten-1">
      <v-card-title class="headline primary lighten-2" primary-title>
        Crea una nueva sala
      </v-card-title>

      <v-card-text>
        <vuelidate-form-slot :vuelidate="$v">
          <v-layout row wrap>
            <v-flex xs12 pa-4>
              <vuelidate-form-group name="name">
                <template slot-scope="{ attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-model="form.name"
                    label="Nombre de la sala"
                    @input="$v.form.name.$touch()"
                    @blur="$v.form.name.$touch()"
                  />
                </template>
              </vuelidate-form-group>
            </v-flex>
            <v-flex xs12 pa-4>
              <vuelidate-form-group name="description">
                <template slot-scope="{ attrs }">
                  <v-textarea
                    v-bind="attrs"
                    v-model="form.description"
                    label="Descripción de la sala"
                    @input="$v.form.description.$touch()"
                    @blur="$v.form.description.$touch()"
                  />
                </template>
              </vuelidate-form-group>
            </v-flex>
            <v-btn color="blue darken-1" text @click="closeModal">Cerrar</v-btn>
            <v-btn color="blue darken-1" text @click="submit">Crear nueva sala</v-btn>
          </v-layout>
        </vuelidate-form-slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationMixin } from "vuelidate";
  import { required, maxLength, minLength } from "vuelidate/lib/validators";

  export default {
    name: "NewRoomModal",
    props: ["dialog"],
    mixins: [validationMixin],
    data() {
      return {
        form: {
          name: "",
          description: ""
        }
      };
    },
    validations: {
      form: {
        name: {
          required,
          maxLength: maxLength(50),
          minLength: minLength(5)
        },
        description: {
          required,
          maxLength: maxLength(200),
          minLength: minLength(5)
        }
      }
    },
    methods: {
      closeModal() {
        this.form = {
          name: "",
          description: ""
        };

        this.$v.$reset();
        this.$emit("close");
      },
      submit() {
        this.$v.$touch();

        if (this.$v.$anyError) return;

        this.$emit("submit", this.form);
        this.closeModal();
      }
    }
  };
</script>
