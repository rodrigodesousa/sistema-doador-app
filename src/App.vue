<template>
  <v-app>
    <NavigationBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
  async mounted() {
    const response = await this.$http.get("pessoas");
    console.log(response);
  },
};
</script>
