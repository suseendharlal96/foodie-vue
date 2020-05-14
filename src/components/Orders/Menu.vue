<template>
  <div>
    <div class="row">
      <span class="col-md-8">
        <h3 class="fname">{{name}}</h3>
      </span>
      <span class="col-md-4">
        <button class="btn btn-success" @click="addItem">Add</button>
      </span>
    </div>
    <div class="desc">
      <p>{{desc}}</p>
    </div>
    <br />
    <p class="amount">{{"\u20B9"}}{{price}}</p>
  </div>
</template>
<script>
export default {
  props: ["name", "price", "desc"],
  methods: {
    addItem() {
      this.$emit("addItem", this.price);
    }
  }
};
</script>