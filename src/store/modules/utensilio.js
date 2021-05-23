const state = {
  utensilios: [],
  utensilio: {},
  paginaUtensilios: 1,
  totalPaginasUtensilios: 1,
};

const getters = {
  getUtensilios(state) {
    return state.utensilios;
  },
  getUtensilio(state) {
    return state.utensilio;
  },
  getPaginaUtensilios(state) {
    return state.paginaUtensilios;
  },
  getTotalPaginasUtensilios(state) {
    return state.totalPaginasUtensilios;
  },
};

const mutations = {
  mSetUtensilio(state, valor) {
    state.utensilio = valor;
  },
  mSetUtensilios(state, valor) {
    state.utensilios = valor;
  },
  mSetPaginaUtensilios(state, valor) {
    state.paginaUtensilios = valor;
  },
  mSetTotalPaginasUtensilios(state, valor) {
    state.totalPaginasUtensilios = valor;
  },
};

const actions = {
  setUtensilio(context, valor) {
    context.commit("mSetUtensilio", valor);
  },
  setUtensilios(context, valor) {
    context.commit("mSetUtensilios", valor.body.content);
    context.commit("mSetPaginaUtensilios", valor.body.number);
    context.commit("mSetTotalPaginasUtensilios", valor.body.totalPages);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
