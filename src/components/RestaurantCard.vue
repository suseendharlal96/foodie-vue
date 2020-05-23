<template>
  <div class="cart" @click="navigate">
    <center>
      <img :src="thumbnailImage" :alt="name" />
    </center>
    <h3>{{name}}</h3>
    <p>{{cuisines}}</p>
    <p>Rating: {{"★".repeat(rating)}}</p>
    <p>Reviews: {{reviews}}</p>
  </div>
</template>
<script>
export default {
  props: ["thumbnailImage", "name", "cuisines", "rating", "reviews"],
  methods: {
    navigate() {
      console.log(this.name);
      this.$router.push(`/order/${this.name}`);
    }
  }
};
</script>
<style scoped>
h3 {
  color: var(--primaryText);
}
</style>