<template>
  <v-container v-if="loading">
    <v-row>
      <v-col>
        <v-progress-linear
          indeterminate
          color="blue darken-2"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row v-if="$route.name == 'Admin'" class="text-center">
      <v-col>
        <v-btn color="success" @click.prevent="openFormularioUtensilio = true"
          ><v-icon class="mr-2">mdi-gift</v-icon> adicionar</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="utensilios.length > 0" class="text-center">
      <v-col v-for="item in utensilios" :key="item.id" cols="12" md="4">
        <CardUtensilio :utensilio="item" />
      </v-col>
    </v-row>
    <v-row v-else class="text-center">
      <v-col cols="12" md="4">
        <h2>
          {{
            $route.name == "Admin"
              ? "Não há utensilios salvos"
              : "Não há utensilios disponiveis"
          }}
        </h2>
      </v-col>
    </v-row>
    <v-row v-if="utensilios.length > 0">
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
    loading: false,
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
          this.loading = true;
          const response =
            this.$route.name == "Admin"
              ? await this.$http.get(`utensilios?page=${val - 1}`)
              : await this.$http.get(`utensilios/disponivel?page=${val - 1}`);
          this.$store.dispatch("setUtensilios", response);
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
  },
  async mounted() {
    try {
      this.loading = true;
      const response =
        this.$route.name == "Admin"
          ? await this.$http.get("utensilios")
          : await this.$http.get("utensilios/disponivel");
      console.log(response);
      this.$store.dispatch("setUtensilios", response);
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
};
</script>
