<template>
  <v-dialog v-model="open" @click:outside="fecharDialog()" width="500">
    <v-card>
      <v-card-title>Formulario de Utensilio</v-card-title>
      <v-form
        ref="form"
        @submit.prevent="
          utensilio ? confirmarAlteracao() : adicionarUtensilio()
        "
        v-model="valido"
      >
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Nome"
                v-model="nome"
                :rules="nomeRules"
              ></v-text-field>
              <v-textarea
                label="Descricao"
                v-model="descricao"
                :rules="descricaoRules"
              ></v-textarea>
              <v-switch v-model="disponivel" label="Disponivel ?"></v-switch>
              <v-select
                v-model="pessoaId"
                :rules="pessoaIdRules"
                :items="pessoas"
                item-text="nome"
                item-value="id"
                label="Doador"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            color="success"
            type="submit"
            :loading="loading"
            :disabled="!valido || loading"
            >Salvar</v-btn
          >
          <v-btn @click="fecharDialog()" :disabled="loading">Cancelar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <ConfirmacoesUtensilio
      :open="openConfirm"
      :utensilio="utensilioAlterada"
      @close="fecharDialog()"
      :modoAlterar="true"
    />
  </v-dialog>
</template>
<script>
import ConfirmacoesUtensilio from "@/components/Utensilios/ConfirmacoesUtensilio";

export default {
  props: ["open", "utensilio"],
  components: {
    ConfirmacoesUtensilio,
  },
  data: () => ({
    openConfirm: false,
    loading: false,
    valido: true,
    nome: "",
    utensilioAlterada: "",
    nomeRules: [
      (v) => !!v || "Preenchimento de nome é obrigatório",
      (v) =>
        (!!v && v.length >= 5 && v.length <= 80) ||
        "Nome deve ter entre 5 e 80 caracteres",
    ],
    descricao: "",
    descricaoRules: [
      (v) => !!v || "Preenchimento de descricao é obrigatório",
      (v) =>
        (!!v && v.length >= 5 && v.length <= 255) ||
        "Nome deve ter entre 5 e 255 caracteres",
    ],
    disponivel: false,
    pessoas: "",
    pessoaId: "",
    pessoaIdRules: [(v) => !!v || "Preenchimento de doador é obrigatório"],
  }),
  watch: {
    open() {
      if (this.open && this.utensilio) {
        this.nome = this.utensilio.nome;
        this.descricao = this.utensilio.descricao;
        this.disponivel = this.utensilio.disponivel;
        this.pessoaId = this.utensilio.pessoa.id;
      }
    },
  },
  async mounted() {
    const response = await this.$http.get("pessoas/all");
    this.pessoas = response.body;
  },
  methods: {
    fecharDialog() {
      this.$emit("close");
      this.nome = "";
      this.descricao = "";
      this.$refs.form.reset();
      this.openConfirm = false;
    },
    async adicionarUtensilio() {
      try {
        this.loading = true;
        const parametros = {
          nome: this.nome,
          descricao: this.descricao,
          disponivel: this.disponivel,
          pessoa: { id: this.pessoaId },
        };
        let response = await this.$http.post("utensilios", parametros);
        console.log(response);
        response = await this.$http.get("utensilios");
        this.$store.dispatch("setUtensilios", response);
        this.$store.dispatch("setCorMensagem", "success");
        this.$store.dispatch(
          "setMensagem",
          "Utensilio adicionado com sucesso!"
        );
        this.fecharDialog();
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
    confirmarAlteracao() {
      this.utensilioAlterada = {
        id: this.utensilio.id,
        nome: this.nome,
        descricao: this.descricao,
        disponivel: this.disponivel,
        pessoa: { id: this.pessoaId },
      };
      this.openConfirm = true;
    },
  },
};
</script>
