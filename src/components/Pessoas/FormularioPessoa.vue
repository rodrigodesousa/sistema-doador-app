<template>
  <v-dialog v-model="open" @click:outside="fecharDialog()" width="500">
    <v-card>
      <v-card-title>Formulario de Pessoa</v-card-title>
      <v-form
        ref="form"
        @submit.prevent="pessoa ? confirmarAlteracao() : adicionarPessoa()"
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
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
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
    <ConfirmacoesPessoa
      :open="openConfirm"
      :pessoa="pessoaAlterada"
      @close="fecharDialog()"
      :modoAlterar="true"
    />
  </v-dialog>
</template>
<script>
import ConfirmacoesPessoa from "@/components/Pessoas/ConfirmacoesPessoa";

export default {
  props: ["open", "pessoa"],
  components: {
    ConfirmacoesPessoa,
  },
  data: () => ({
    openConfirm: false,
    loading: false,
    valido: true,
    nome: "",
    pessoaAlterada: "",
    nomeRules: [
      (v) => !!v || "Preenchimento de nome é obrigatório",
      (v) =>
        (!!v && v.length >= 5 && v.length <= 80) ||
        "Nome deve ter entre 5 e 80 caracteres",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "Preenchimento de email é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Email inválido",
    ],
  }),
  watch: {
    open() {
      if (this.open && this.pessoa) {
        this.nome = this.pessoa.nome;
        this.email = this.pessoa.email;
      }
    },
  },
  methods: {
    fecharDialog() {
      this.$emit("close");
      this.nome = "";
      this.email = "";
      this.$refs.form.reset();
      this.openConfirm = false;
    },
    async adicionarPessoa() {
      try {
        this.loading = true;
        const parametros = {
          nome: this.nome,
          email: this.email,
        };
        let response = await this.$http.post("pessoas", parametros);
        console.log(response);
        response = await this.$http.get("pessoas");
        this.$store.dispatch("setPessoas", response);
        this.fecharDialog();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    confirmarAlteracao() {
      this.pessoaAlterada = {
        id: this.pessoa.id,
        nome: this.nome,
        email: this.email,
      };
      this.openConfirm = true;
    },
  },
};
</script>
