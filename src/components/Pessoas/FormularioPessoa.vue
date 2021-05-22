<template>
  <v-dialog v-model="open" @click:outside="fecharDialog()" width="500">
    <v-card>
      <v-card-title>Formulario de Pessoa</v-card-title>
      <v-form ref="form" @submit.prevent="adicionarPessoa()" v-model="valido">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Nome"
                v-model="nome"
                :rules="nomeRules"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            color="success"
            type="submit"
            :loading="loading"
            :disabled="!valido || loading"
            >Salvar</v-btn
          >
          <v-btn @click="fecharDialog()" :disabled="loading">Cancelar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["open"],
  data: () => ({
    loading: false,
    valido: true,
    nome: "",
    nomeRules: [
      (v) => !!v || "Preenchimento de nome é obrigatório",
      (v) =>
        (v.length >= 5 && v.length <= 80) ||
        "Nome deve ter entre 5 e 80 caracteres",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "Preenchimento de email é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Email inválido",
    ],
  }),
  methods: {
    fecharDialog() {
      this.$emit("close");
      this.nome = null;
      this.email = null;
      this.$refs.form.reset();
    },
    async adicionarPessoa() {
      try {
        this.loading = true;
        const parametros = {
          nome: this.nome,
          email: this.email,
        };
        let response = await this.$http.post("pessoas", parametros);
        console.log(response);
        response = await this.$http.get("pessoas");
        this.$store.dispatch("setPessoas", response.body.content);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.fecharDialog();
      }
    },
  },
};
</script>
