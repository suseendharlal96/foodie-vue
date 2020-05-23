<template>
  <div>
    <CheckoutSummary :orderData="orderData[0]" @continuePur="showModal=true"></CheckoutSummary>
    <Modal v-if="showModal" :show="showModal" @closeModal="showModal=false">
      <ContactForm :orderData="orderData"></ContactForm>
    </Modal>
  </div>
</template>
<script>
import CheckoutSummary from "../Checkout/CheckoutSummary/CheckoutSummary";
import Modal from "../Modal/Modal";
import ContactForm from "../Checkout/ContactForm/ContactForm";
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
    ContactForm: ContactForm,
    Modal: Modal
  },
  created() {
    this.orderData = this.$store.getters.getTempOrders;
    console.log(this.orderData);
  }
};
</script>
