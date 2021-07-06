<template>
  <v-dialog v-model="open" @click:outside="$emit('close')" width="300">
    <v-card>
      <v-card-title v-if="modoAlterar" style="word-break: keep-all"
        >Você tem certeza que deseja alterar esta Pessoa?</v-card-title
      >
      <v-card-title v-else style="word-break: keep-all"
        >Você tem certeza que deseja excluir esta Pessoa?</v-card-title
      >
      <v-card-actions>
        <v-btn
          v-if="!modoAlterar"
          color="red"
          :loading="loading"
          :disabled="loading"
          @click="excluirPessoa()"
          >sim</v-btn
        >
        <v-btn
          v-else
          color="warning"
          :loading="loading"
          :disabled="loading"
          @click="alterarPessoa()"
          >sim</v-btn
        >
        <v-btn :disabled="loading" @click="$emit('close')">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["open", "pessoa", "modoAlterar"],
  data: () => ({
    loading: false,
  }),
  methods: {
    async alterarPessoa() {
      try {
        this.loading = true;
        const parametros = {
          nome: this.pessoa.nome,
          email: this.pessoa.email,
        };
        let response = await this.$http.put(
          `pessoas/${this.pessoa.id}`,
          parametros
        );
        response = await this.$http.get("pessoas");
        this.$store.dispatch("setPessoas", response);
        this.$store.dispatch("setCorMensagem", "warning");
        this.$store.dispatch("setMensagem", "Pessoa alterada com sucesso!");
        this.$emit("close");
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
    async excluirPessoa() {
      try {
        this.loading = true;
        let response = await this.$http.delete(`pessoas/${this.pessoa.id}`);
        response = await this.$http.get("pessoas");
        this.$store.dispatch("setPessoas", response);
        this.$store.dispatch("setCorMensagem", "red");
        this.$store.dispatch("setMensagem", "Pessoa excluida com sucesso!");
        this.$emit("close");
      } catch (error) {
        this.$store.dispatch("setCorMensagem", "red");
        if (error.body) {
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
