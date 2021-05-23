<template>
  <div>
    <ListaPessoas v-if="tabAdmin == 'Pessoas'" />
    <ListaUtensilios v-else />
    <v-snackbar v-model="snackbar" :timeout="-1" app :color="corMensagem">{{
      snackMessage
    }}</v-snackbar>
  </div>
</template>
<script>
import ListaPessoas from "@/components/Pessoas/ListaPessoas.vue";
import ListaUtensilios from "@/components/Utensilios/ListaUtensilios.vue";
import snackbarMixin from "@/mixins/snackbar";

export default {
  components: {
    ListaPessoas,
    ListaUtensilios,
  },
  mixins: [snackbarMixin],
  computed: {
    tabAdmin() {
      return this.$store.getters.getTabAdmin;
    },
  },
};
</script>
