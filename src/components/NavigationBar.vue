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
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
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
  }),
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
