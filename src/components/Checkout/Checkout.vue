<template>
  <div>
    <CheckoutSummary :orderData="orderData[0]" @continuePur="showModal=true"></CheckoutSummary>
    <Modal v-if="showModal" :show="showModal" :orderData="orderData" @closeModal="showModal=false"></Modal>
  </div>
</template>
<script>
import CheckoutSummary from "../Checkout/CheckoutSummary/CheckoutSummary";
import Modal from "../Modal/Modal";
export default {
  data() {
    return {
      orderData: null,
      proceed: false,
      showModal: false
    };
  },
  components: {
    CheckoutSummary: CheckoutSummary,
    Modal: Modal
  },
  created() {
    this.orderData = this.$store.getters.getTempOrders;
    console.log(this.orderData);
  }
};
</script>
