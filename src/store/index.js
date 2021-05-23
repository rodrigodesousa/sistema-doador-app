import Vue from "vue";
import Vuex from "vuex";
import pessoa from "@/store/modules/pessoa.js";
import utensilio from "@/store/modules/utensilio.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabAdmin: "Pessoas",
  },
  getters: {
    getTabAdmin(state) {
      return state.tabAdmin;
    },
  },
  mutations: {
    mSetTabAdmin(state, valor) {
      state.tabAdmin = valor;
    },
  },
  actions: {
    setTabAdmin(context, valor) {
      context.commit("mSetTabAdmin", valor);
    },
  },
  modules: {
    pessoa,
    utensilio,
  },
});
