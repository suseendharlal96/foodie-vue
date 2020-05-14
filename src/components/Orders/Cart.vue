<template>
  <div>
    <p id="pitem">
      {{name}}
      <br />
      <strong>Price: {{"\u20B9"}} {{price}}(1)</strong>
      <strong>Total: {{"\u20B9"}} {{price * quantity}}</strong>
      <br />
      <br />
      <input class="ip" type="button" @click="decrement" value="-" />
      <input class="ip" :id="'tx-w' + ind" type="text" readonly :value="quantity" />
      <input class="ip" type="button" @click="increment" value="+" />
    </p>
  </div>
</template>

<script>
export default {
  props: ["name", "price", "ind", "quantity"],
  methods: {
    increment() {
      this.$emit("increment");
    },
    decrement() {
      this.$emit("decrement");
    }
  }
};
</script>