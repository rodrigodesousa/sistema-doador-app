<template>
  <div v-if="tabAdmin == 'Pessoas'">
    <ListaPessoas />
  </div>
  <div v-else>
    <ListaUtensilios />
  </div>
</template>
<script>
import ListaPessoas from "@/components/Pessoas/ListaPessoas.vue";
import ListaUtensilios from "@/components/Utensilios/ListaUtensilios.vue";

export default {
  components: {
    ListaPessoas,
    ListaUtensilios,
  },
  computed: {
    tabAdmin() {
      return this.$store.getters.getTabAdmin;
    },
  },
};
</script>
