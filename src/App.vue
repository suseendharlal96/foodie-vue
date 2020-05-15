<template>
  <div>
    <Layout></Layout>
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from "./components/Layout/Layout";
export default {
  components: {
    Layout: Layout
  }
};
</script>

<style>
</style>