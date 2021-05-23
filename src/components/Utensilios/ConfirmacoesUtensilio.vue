<template>
  <v-dialog v-model="open" @click:outside="$emit('close')" width="300">
    <v-card>
      <v-card-title v-if="modoAlterar" style="word-break: keep-all"
        >Você tem certeza que deseja alterar esta Utensilio?</v-card-title
      >
      <v-card-title v-else style="word-break: keep-all"
        >Você tem certeza que deseja excluir esta Utensilio?</v-card-title
      >
      <v-card-actions>
        <v-btn
          v-if="!modoAlterar"
          color="red"
          :loading="loading"
          :disabled="loading"
          @click="excluirUtensilio()"
          >sim</v-btn
        >
        <v-btn
          v-else
          color="warning"
          :loading="loading"
          :disabled="loading"
          @click="alterarUtensilio()"
          >sim</v-btn
        >
        <v-btn :disabled="loading" @click="$emit('close')">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["open", "utensilio", "modoAlterar"],
  data: () => ({
    loading: false,
  }),
  methods: {
    async alterarUtensilio() {
      try {
        this.loading = true;
        const parametros = {
          nome: this.utensilio.nome,
          descricao: this.utensilio.descricao,
          disponivel: this.utensilio.disponivel,
          pessoa: this.utensilio.pessoa,
        };
        let response = await this.$http.put(
          `utensilios/${this.utensilio.id}`,
          parametros
        );
        console.log(response);
        response = await this.$http.get("utensilios");
        this.$store.dispatch("setUtensilios", response);
        this.$emit("close");
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async excluirUtensilio() {
      try {
        this.loading = true;
        let response = await this.$http.delete(
          `utensilios/${this.utensilio.id}`
        );
        console.log(response);
        response = await this.$http.get("utensilios");
        this.$store.dispatch("setUtensilios", response);
        this.$emit("close");
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
