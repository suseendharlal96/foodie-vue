<template>
  <div>
    <Layout></Layout>
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from "./components/Layout/Layout";
import "./theme.css";
export default {
  components: {
    Layout: Layout
  }
};
</script>

<style>
body {
  background-color: var(--primaryBg);
}
</style>