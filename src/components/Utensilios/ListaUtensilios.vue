<template>
  <v-container>
    <v-row v-if="$route.name == 'Admin'" class="text-center">
      <v-col>
        <v-btn color="success" @click.prevent="openFormularioUtensilio = true"
          ><v-icon class="mr-2">mdi-account-plus</v-icon> adicionar</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col v-for="item in utensilios" :key="item.id" cols="12" md="4">
        <CardUtensilio :utensilio="item" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination v-model="pagina" :length="totalPaginas"></v-pagination>
      </v-col>
    </v-row>
    <FormularioUtensilio
      :open="openFormularioUtensilio"
      @close="openFormularioUtensilio = false"
      :utensilio="null"
    />
  </v-container>
</template>

<script>
import CardUtensilio from "@/components/Utensilios/CardUtensilio.vue";
import FormularioUtensilio from "@/components/Utensilios/FormularioUtensilio.vue";

export default {
  name: "ListaUtensilios",
  components: {
    CardUtensilio,
    FormularioUtensilio,
  },
  data: () => ({
    openFormularioUtensilio: false,
  }),
  computed: {
    utensilios() {
      return this.$store.getters.getUtensilios;
    },
    totalPaginas() {
      return this.$store.getters.getTotalPaginasUtensilios;
    },
    pagina: {
      get() {
        return this.$store.getters.getPaginaUtensilios + 1;
      },
      async set(val) {
        try {
          const response =
            this.$route.name == "Admin"
              ? await this.$http.get(`utensilios?page=${val - 1}`)
              : await this.$http.get(`utensilios/disponivel?page=${val - 1}`);
          this.$store.dispatch("setUtensilios", response);
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
  async mounted() {
    try {
      const response =
        this.$route.name == "Admin"
          ? await this.$http.get("utensilios")
          : await this.$http.get("utensilios/disponivel");
      console.log(response);
      this.$store.dispatch("setUtensilios", response);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
