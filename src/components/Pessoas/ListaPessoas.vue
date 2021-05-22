<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-btn color="success"
          ><v-icon class="mr-2">mdi-account-plus</v-icon> adicionar</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" md="3">
        <CardPessoa />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardPessoa from "@/components/Pessoas/CardPessoa.vue";

export default {
  name: "ListaPessoas",
  components: {
    CardPessoa,
  },
  data: () => ({
    //
  }),
};
</script>
