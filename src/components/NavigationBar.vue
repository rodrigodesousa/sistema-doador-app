<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <template v-else>
        <v-btn
          @click.prevent="group = 'Home'"
          :outlined="$route.name == 'Home'"
          :text="$route.name != 'Home'"
          >Home</v-btn
        >
        <v-btn
          @click.prevent="group = 'Admin'"
          :outlined="$route.name == 'Admin'"
          :text="$route.name != 'Admin'"
          >Admin</v-btn
        >
      </template>
      <v-spacer></v-spacer>
      <div
        v-if="$route.name == 'Admin'"
        style="width: 200px; padding-top: 20px"
      >
        <v-select v-model="tabAdmin" :items="items" flat dense></v-select>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
      left
      :height="$vuetify.breakpoint.height"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item value="Home">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item value="Admin">
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: "",
    items: ["Pessoas", "Utensilios"],
  }),
  computed: {
    tabAdmin: {
      get() {
        return this.$store.getters.getTabAdmin;
      },
      set(val) {
        this.$store.dispatch("setTabAdmin", val);
      },
    },
  },
  watch: {
    group() {
      this.$route.name != this.group
        ? this.$router.push({ name: this.group })
        : "";
      this.drawer = false;
    },
  },
  mounted() {
    this.group = this.$route.name;
  },
};
</script>
