<template>
  <div>
    checkout
    <CheckoutSummary :orderData="orderData[0]"></CheckoutSummary>
    <!-- <ContactForm></ContactForm> -->
  </div>
</template>
<script>
import CheckoutSummary from "../Checkout/CheckoutSummary/CheckoutSummary";
// import ContactForm from "../Checkout/ContactForm/ContactForm";
export default {
  data() {
    return {
      orderData: null
    };
  },
  components: {
    CheckoutSummary: CheckoutSummary
    // ContactForm: ContactForm
  },
  created() {
    console.log(this.$store.getters.getTempOrders);
    this.orderData = this.$store.getters.getTempOrders;
    console.log(this.orderData);
  }
};
</script>
// import React, { useState, useEffect } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";

// import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
// import ContactForm from "./ContactForm/ContactForm";
// import Modal from "../Modal/Modal";

// const Checkout = (props) => {
//   const [continuePurchase, setContinuePurchase] = useState(false);

//   useEffect(() => {
//     console.log(props);
//   }, []);

//   const formSubmit = () => {
//     setContinuePurchase(true);
//     if (props.location.pathname.search("edit") !== -1) {
//       props.history.replace(
//         `/checkout/contact-form/${
//           props.location.pathname.split("/")[2]
//         }/edit`
//       );
//     } else {
//       props.history.replace("/checkout/contact-form");
//     }
//   };

//   const closeModalHandler = () => {
//     setContinuePurchase(false);
//   };
//   let summary = <Redirect to="/" />;
//   const isPurchased = props.isPurchased ? <Redirect to="/success" /> : null;
//   if (props.orderData) {
//     summary = (
//       <div>
//         {isPurchased}
//         <CheckoutSummary
//           orderData={props.orderData}
//           closeSummary={() => props.history.replace("/")}
//           continue={formSubmit}
//         />
//         <Route
//           path={props.match.path + "/contact-form"}
//           render={(props) => (
//             <Modal show={continuePurchase} closeModal={closeModalHandler}>
//               <ContactForm {...props} />
//             </Modal>
//           )}
//         />
//       </div>
//     );
//   }

//   return summary;
// };

// const mapStateToProps = (state) => {
//   return {
//     isPurchased: state.orderReducer.purchased,
//     orderData: state.orderReducer.orders,
//   };
// };

// export default connect(mapStateToProps)(Checkout);
