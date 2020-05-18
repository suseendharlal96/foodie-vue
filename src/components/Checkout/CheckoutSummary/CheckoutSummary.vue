<template>
  <div class="CheckoutSummary">
    <div :style="{ width: '100%', margin: 'auto' }">
      <h3 :style="{ color: 'var(--primaryText)' }">Hotel Name: {{orderData.name}}</h3>
      <p :style="{ color: 'var(--primaryText)' }">Address: {{orderData.address}}</p>
      <ol :style="{ color: 'var(--primaryText)' }">
        <template v-for="(m, index) in orderData.menu">
          <li :key="index" :style="{ color: 'var(--primaryText)' }">
            Name: {{m.name}} -- Price: {{"\u20B9"}} {{m.price}}(1) -- Quantity:
            {{m.quantity}} -- Total: {{"\u20B9"}}
            {{m.price * m.quantity}}
          </li>
        </template>
      </ol>
      <p :style="{ color: 'var(--primaryTheme)' }">
        Total Price:
        <strong :style="{ color: 'var(--primaryText)' }">
          {{"\u20B9"}}
          {{orderData.total}}
        </strong>
      </p>
    </div>
    <button class="btn btn-success" @click="continuePur">Confirm</button>
    <button class="btn btn-danger" @click="cancel">Cancel</button>
  </div>
</template>
<script>
export default {
  props: ["orderData"],
  methods: {
    continuePur() {
      this.$emit("continuePur");
    },
    cancel() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.CheckoutSummary {
  text-align: center;
  width: 80%;
  margin: auto;
}
</style>
