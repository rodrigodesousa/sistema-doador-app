<template>
  <v-dialog v-model="open" @click:outside="$emit('close')" width="300">
    <v-card>
      <v-card-title
        >Você tem certeza que deseja excluir esta Pessoa?</v-card-title
      >
      <v-card-actions>
        <v-btn
          color="red"
          :loading="loading"
          :disabled="loading"
          @click="excluirPessoa()"
          >sim</v-btn
        >
        <v-btn :disabled="loading" @click="$emit('close')">cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["open", "pessoa"],
  data: () => ({
    loading: false,
  }),
  methods: {
    async excluirPessoa() {
      try {
        this.loading = true;
        let response = await this.$http.delete(`pessoas/${this.pessoa.id}`);
        console.log(response);
        response = await this.$http.get("pessoas");
        this.$store.dispatch("setPessoas", response.body.content);
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
