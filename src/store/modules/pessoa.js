const state = {
  pessoas: [],
  pessoa: {},
  paginaPessoas: 1,
  totalPaginasPessoas: 1,
};

const getters = {
  getPessoas(state) {
    return state.pessoas;
  },
  getPessoa(state) {
    return state.pessoa;
  },
  getPaginaPessoas(state) {
    return state.paginaPessoas;
  },
  getTotalPaginasPessoas(state) {
    return state.totalPaginasPessoas;
  },
};

const mutations = {
  mSetPessoa(state, valor) {
    state.pessoa = valor;
  },
  mSetPessoas(state, valor) {
    state.pessoas = valor;
  },
  mSetPaginaPessoas(state, valor) {
    state.paginaPessoas = valor;
  },
  mSetTotalPaginaPessoas(state, valor) {
    state.totalPaginasPessoas = valor;
  },
};

const actions = {
  setPessoa(context, valor) {
    context.commit("mSetPessoa", valor);
  },
  setPessoas(context, valor) {
    context.commit("mSetPessoas", valor.body.content);
    context.commit("mSetPaginaPessoas", valor.body.number);
    context.commit("mSetTotalPaginaPessoas", valor.body.totalPages);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
