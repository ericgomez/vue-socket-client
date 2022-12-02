import Vue from "vue";
import vuelidate from "vuelidate";
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import VuelidateFormGroup from "../components/forms/VuelidateFormGroup";
import VuelidateForm from "../components/forms/VuelidateForm";

Vue.use(vuelidate);

Vue.use(vuelidateErrorExtractor, {
  messages: {
    required: "{attribute}: campo requerido",
    minLength: "La longitud mínima debe ser de {min}",
    maxLength: "La longitud máxima debe ser de {max}",
    length: "La longitud debe ser exactamente de {length}",
    emailMatch: "No se ha encontrado ninguna cuenta con estas credenciales",
    email: "{attribute} no tiene un formato válido",
    isUnique: "El campo {attribute} ya existe en base de datos",
    sameAs: "{attribute}: campo requerido"
  },
  attributes: {
    name: "Nombre",
    description: "Descripción"
  }
});

// Add form components globally
Vue.component("vuelidate-form-slot", VuelidateForm);
Vue.component("vuelidate-form-group", VuelidateFormGroup);
Vue.component("form-wrapper", templates.FormWrapper);
