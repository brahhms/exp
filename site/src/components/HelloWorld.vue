<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-combobox
            outlined
            dense
            label="No."
            v-model="model"
            :loading="loading"
            :items="expedientes"
            :search-input.sync="search"
            item-text="no"
            required
            return-object
          >
          </v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="model.paciente.nombre"
            :counter="10"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-text-field
            v-model="model.paciente.apellido"
            :counter="10"
            :rules="nameRules"
            label="Apellido"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-text-field
            v-model="model.paciente.email"
            :rules="emailRules"
            label="E-mail"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="model.paciente.sexo"
            :counter="1"
            :rules="nameRules"
            label="Sexo"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-text-field
            v-model="model.paciente.nacimiento"
            :counter="10"
            :rules="nameRules"
            label="Nacimiento"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-text-field
            v-model="model.paciente.direccion"
            :counter="10"
            :rules="nameRules"
            label="Direccion"
            required
          ></v-text-field
        ></v-col>
      </v-row>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>

      <v-btn
        :disabled="!valid"
        color="primary"
        class="ml-4"
        @click="saveExpediente"
      >
        Enviar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    valid: true,
    loading: false,
    search: null,

    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    ...mapMutations(["setExpediente"]),
    ...mapActions(["saveExpediente","searchExpedientes"]),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    async querySelections(v) {
      this.loading = true;
      await this.searchExpedientes(v);
      this.loading = false;
    },
  },

  computed: {
    ...mapState(["expediente", "expedientes"]),
    model: {
      set(exp) {
        this.setExpediente(exp);
        return exp;
      },
      get() {
        return this.expediente;
      },
    },
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
};
</script>