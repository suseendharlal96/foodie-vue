<template>
  <div class="DrawerToggle" @click="clicked">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
export default {
  methods: {
    clicked() {
      this.$emit("clicked");
    }
  }
};
</script>
<style >
.DrawerToggle {
  width: 40px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
}

.DrawerToggle div {
  width: 90%;
  height: 3px;
  background-color: white;
}

@media (min-width: 500px) {
  .DrawerToggle {
    display: none;
  }
}
</style>
