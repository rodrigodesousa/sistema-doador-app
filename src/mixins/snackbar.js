export default {
  data: () => ({
    snackbar: false,
  }),
  computed: {
    snackMessage() {
      return this.$store.getters.getMensagem;
    },
    corMensagem() {
      return this.$store.getters.getCorMensagem;
    },
  },
  watch: {
    snackMessage() {
      if (this.snackMessage != "") {
        this.snackbar = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => (this.snackbar = false), 3000);
      }
    },
    snackbar() {
      if (!this.snackbar) {
        this.$store.dispatch("setMensagem", "");
      }
    },
  },
};
