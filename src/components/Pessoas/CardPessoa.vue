<template>
  <v-card class="mx-auto" max-width="400">
    <v-icon size="100">mdi-account-box</v-icon><br />
    <v-container>
      <v-row>
        <v-col>
          <v-card-subtitle
            ><strong>Nome: </strong>{{ pessoa.nome }}</v-card-subtitle
          >
          <v-card-subtitle
            ><strong>Email: </strong>{{ pessoa.email }}</v-card-subtitle
          >
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn color="orange" text><v-icon>mdi-pencil</v-icon> alterar </v-btn>

      <v-btn color="red" text @click="openConfirm = true"
        ><v-icon>mdi-trash-can</v-icon> deletar
      </v-btn>
    </v-card-actions>
    <ConfirmacoesPessoa
      :open="openConfirm"
      :pessoa="pessoa"
      @close="openConfirm = false"
    />
  </v-card>
</template>
<script>
import ConfirmacoesPessoa from "@/components/Pessoas/ConfirmacoesPessoa";

export default {
  props: ["pessoa"],
  components: {
    ConfirmacoesPessoa,
  },
  data: () => ({
    openConfirm: false,
  }),
};
</script>
