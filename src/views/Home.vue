<template>
  <div>
    <ListaUtensilios />
    <v-snackbar
      v-model="snackbar"
      :max-width="$vuetify.breakpoint.width"
      :timeout="-1"
      :color="corMensagem"
      >{{ snackMessage }}</v-snackbar
    >
  </div>
</template>

<script>
import snackbarMixin from "@/mixins/snackbar";
import ListaUtensilios from "@/components/Utensilios/ListaUtensilios.vue";

export default {
  name: "Home",
  components: {
    ListaUtensilios,
  },
  mixins: [snackbarMixin],
};
</script>
