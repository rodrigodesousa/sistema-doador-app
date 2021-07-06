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
      <v-btn color="orange" @click="openFormularioPessoa = true" text
        ><v-icon>mdi-pencil</v-icon> alterar
      </v-btn>

      <v-btn color="red" text @click="openConfirm = true"
        ><v-icon>mdi-trash-can</v-icon> deletar
      </v-btn>
    </v-card-actions>
    <ConfirmacoesPessoa
      :open="openConfirm"
      :pessoa="pessoa"
      @close="openConfirm = false"
    />
    <FormularioPessoa
      :open="openFormularioPessoa"
      @close="openFormularioPessoa = false"
      :pessoa="pessoa"
      :modoAlterar="false"
    />
  </v-card>
</template>
<script>
import ConfirmacoesPessoa from "@/components/Pessoas/ConfirmacoesPessoa";
import FormularioPessoa from "@/components/Pessoas/FormularioPessoa.vue";

export default {
  props: ["pessoa"],
  components: {
    ConfirmacoesPessoa,
    FormularioPessoa,
  },
  data: () => ({
    openConfirm: false,
    openFormularioPessoa: false,
  }),
};
</script>
