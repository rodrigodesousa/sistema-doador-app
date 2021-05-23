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
    <v-row class="text-center">
      <v-col>
        <v-btn color="success" @click.prevent="openFormularioPessoa = true"
          ><v-icon class="mr-2">mdi-account-plus</v-icon> adicionar</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="pessoas.length > 0" class="text-center">
      <v-col v-for="item in pessoas" :key="item.id" cols="12" md="3">
        <CardPessoa :pessoa="item" />
      </v-col>
    </v-row>
    <v-row v-else class="text-center">
      <v-col cols="12" md="4">
        <h2>Não há pessoas cadastradas</h2>
      </v-col>
    </v-row>
    <v-row v-if="pessoas.length > 0">
      <v-col>
        <v-pagination v-model="pagina" :length="totalPaginas"></v-pagination>
      </v-col>
    </v-row>
    <FormularioPessoa
      :open="openFormularioPessoa"
      @close="openFormularioPessoa = false"
      :pessoa="null"
    />
  </v-container>
</template>

<script>
import CardPessoa from "@/components/Pessoas/CardPessoa.vue";
import FormularioPessoa from "@/components/Pessoas/FormularioPessoa.vue";

export default {
  name: "ListaPessoas",
  components: {
    CardPessoa,
    FormularioPessoa,
  },
  data: () => ({
    openFormularioPessoa: false,
    loading: false,
  }),
  computed: {
    pessoas() {
      return this.$store.getters.getPessoas;
    },
    totalPaginas() {
      return this.$store.getters.getTotalPaginasPessoas;
    },
    pagina: {
      get() {
        return this.$store.getters.getPaginaPessoas + 1;
      },
      async set(val) {
        try {
          this.loading = true;
          const response = await this.$http.get(`pessoas?page=${val - 1}`);
          this.$store.dispatch("setPessoas", response);
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
      const response = await this.$http.get("pessoas");
      console.log(response);
      this.$store.dispatch("setPessoas", response);
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
