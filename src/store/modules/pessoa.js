const state = {
  pessoas: [],
  pessoa: {},
};

const getters = {
  getPessoas(state) {
    return state.pessoas;
  },
  getPessoa(state) {
    return state.pessoa;
  },
};

const mutations = {
  mSetPessoa(state, valor) {
    state.pessoa = valor;
  },
  mSetPessoas(state, valor) {
    state.pessoas = valor;
  },
};

const actions = {
  setPessoa(context, valor) {
    context.commit("mSetPessoa", valor);
  },
  setPessoas(context, valor) {
    context.commit("mSetPessoas", valor);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
