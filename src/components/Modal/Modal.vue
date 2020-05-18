<template>
  <div>
    <Backdrop :show="show" @clicked="closeModal" />
    <div
      class="Modal"
      :style="[show?{transform:'translateY(0)',opacity:'1'}:{transform:'translateY(-100vh)',opacity:'0'} ]"
    >
      <ContactForm :orderData="orderData"></ContactForm>
    </div>
  </div>
</template>
<script>
import Backdrop from "../Backdrop/Backdrop";
import ContactForm from "../Checkout/ContactForm/ContactForm";
export default {
  props: ["show",'orderData'],
  methods: {
    closeModal() {
      this.$emit("closeModal");
    }
  },
  components: {
    Backdrop: Backdrop,
    ContactForm: ContactForm
  }
};
</script>
<style>
.Modal {
  position: fixed;
  z-index: 500;
  overflow: auto;
  background-color: var(--primaryBg);
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 20%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
}

@media (min-width: 600px) {
  .Modal {
    width: 500px;
    left: calc(50% - 250px);
  }
}
</style>
// import React from "react";

// import styles from "./Modal.module.css";
// import Backdrop from "../Backdrop/Backdrop";

// const Modal = (props) => {
//   return (
//     <React.Fragment>
//       <Backdrop show={props.show} click={props.closeModal} />
//       <div
//         className={styles.Modal}
//         style={{
//           transform: props.show ? "translateY(0)" : "translateY(-100vh)",
//           opacity: props.show ? "1" : "0",
//         }}
//       >
//         {props.children}
//       </div>
//     </React.Fragment>
//   );
// };

// export default Modal;
