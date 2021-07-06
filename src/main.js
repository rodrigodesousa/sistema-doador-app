import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vueresource from "vue-resource";

Vue.use(vueresource);

Vue.http.options.root = "https://sistema-doador-backend.herokuapp.com/";
Vue.http.headers.common["Content-Type"] = "application/json";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
