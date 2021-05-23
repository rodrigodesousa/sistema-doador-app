<template>
  <v-card class="mx-auto" max-width="400">
    <v-icon size="100">mdi-gift</v-icon><br />
    <v-container>
      <v-row>
        <v-col align="left" class="align-left justify-start">
          <v-card-title>{{ utensilio.nome }}</v-card-title>
          <v-card-text class="pa-0 ma-0 subtitle-1">
            <strong>Doador: </strong>{{ utensilio.pessoa.nome }}
          </v-card-text>
          <v-card-text class="pa-0 ma-0 subtitle-1">{{
            utensilio.descricao
          }}</v-card-text>
          <v-card-text class="pa-0 ma-0 subtitle-1">
            <strong>Disponivel ?: </strong
            >{{ utensilio.disponivel ? "SIM" : "NÃO" }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-btn color="orange" @click="openFormularioUtensilio = true" text
        ><v-icon>mdi-pencil</v-icon> alterar
      </v-btn>

      <v-btn color="red" text @click="openConfirm = true"
        ><v-icon>mdi-trash-can</v-icon> deletar
      </v-btn>
    </v-card-actions>
    <ConfirmacoesUtensilio
      :open="openConfirm"
      :utensilio="utensilio"
      @close="openConfirm = false"
    />
    <FormularioUtensilio
      :open="openFormularioUtensilio"
      @close="openFormularioUtensilio = false"
      :utensilio="utensilio"
      :modoAlterar="false"
    />
  </v-card>
</template>
<script>
import ConfirmacoesUtensilio from "@/components/Utensilios/ConfirmacoesUtensilio";
import FormularioUtensilio from "@/components/Utensilios/FormularioUtensilio.vue";

export default {
  props: ["utensilio"],
  components: {
    ConfirmacoesUtensilio,
    FormularioUtensilio,
  },
  data: () => ({
    openConfirm: false,
    openFormularioUtensilio: false,
  }),
};
</script>
