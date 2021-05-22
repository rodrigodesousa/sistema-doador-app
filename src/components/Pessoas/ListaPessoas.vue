<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-btn color="success" @click.prevent="openFormularioPessoa = true"
          ><v-icon class="mr-2">mdi-account-plus</v-icon> adicionar</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col v-for="item in pessoas" :key="item.id" cols="12" md="3">
        <CardPessoa :pessoa="item" />
      </v-col>
    </v-row>
    <FormularioPessoa
      :open="openFormularioPessoa"
      @close="openFormularioPessoa = false"
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
  }),
  computed: {
    pessoas() {
      return this.$store.getters.getPessoas;
    },
  },
  async mounted() {
    try {
      const response = await this.$http.get("pessoas");
      console.log(response);
      this.$store.dispatch("setPessoas", response.body.content);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
