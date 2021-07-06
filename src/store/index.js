import Vue from "vue";
import Vuex from "vuex";
import pessoa from "@/store/modules/pessoa.js";
import utensilio from "@/store/modules/utensilio.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabAdmin: "Pessoas",
    mensagem: "",
    corMensagem: "",
  },
  getters: {
    getTabAdmin(state) {
      return state.tabAdmin;
    },
    getMensagem(state) {
      return state.mensagem;
    },
    getCorMensagem(state) {
      return state.corMensagem;
    },
  },
  mutations: {
    mSetTabAdmin(state, valor) {
      state.tabAdmin = valor;
    },
    mSetMensagem(state, valor) {
      state.mensagem = valor;
    },
    mSetCorMensagem(state, valor) {
      state.corMensagem = valor;
    },
  },
  actions: {
    setTabAdmin(context, valor) {
      context.commit("mSetTabAdmin", valor);
    },
    setMensagem(context, valor) {
      context.commit("mSetMensagem", valor);
    },
    setCorMensagem(context, valor) {
      context.commit("mSetCorMensagem", valor);
    },
  },
  modules: {
    pessoa,
    utensilio,
  },
});
