<template>
  <v-dialog v-model="open" @click:outside="fecharDialog()" width="500">
    <v-card>
      <v-card-title style="word-break: keep-all"
        >Para confirmar a aquisição do Utensilio digite seus dados</v-card-title
      >
      <v-form ref="form" @submit.prevent="adquirirUtensilio()" v-model="valido">
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
            >Confirmar</v-btn
          >
          <v-btn @click="fecharDialog()" :disabled="loading">Cancelar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["open", "utensilio"],
  data: () => ({
    loading: false,
    valido: true,
    nome: "",
    utensilioAlterada: "",
    nomeRules: [
      (v) => !!v || "Preenchimento de nome é obrigatório",
      (v) =>
        (!!v && v.length >= 5 && v.length <= 80) ||
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
      this.nome = "";
      this.email = "";
      this.$refs.form.reset();
    },
    async adquirirUtensilio() {
      try {
        this.loading = true;
        const parametros = {
          nome: this.utensilio.nome,
          descricao: this.utensilio.descricao,
          disponivel: false,
          pessoa: { id: this.utensilio.pessoa.id },
        };
        let response = await this.$http.put(
          `utensilios/${this.utensilio.id}`,
          parametros
        );
        response = await this.$http.get("utensilios/disponivel");
        this.$store.dispatch("setUtensilios", response);
        this.$store.dispatch("setCorMensagem", "success");
        this.$store.dispatch("setMensagem", "Utensilio adquirido com sucesso!");
        this.fecharDialog();
      } catch (error) {
        this.$store.dispatch("setCorMensagem", "red");
        if (error.body.msg) {
          this.$store.dispatch("setMensagem", error.body.msg);
        } else {
          this.$store.dispatch(
            "setMensagem",
            "Houve um erro! tente novamente mais tarde"
          );
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
