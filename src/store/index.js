import Vue from "vue";
import Vuex from "vuex";
import pessoa from "@/store/modules/pessoa.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    pessoa,
  },
});
