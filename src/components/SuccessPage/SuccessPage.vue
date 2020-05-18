<template>
  <div class="Successpage">
    <h2 :style="{ color: 'var(--primaryText)' }">Your order has been successfully placed!</h2>
    <button class="btn btn-success" @click="navHotel">Place New Order!</button>
    <button class="btn btn-warning" @click=" navOrders">Go to My Orders!</button>
    <hr />
    <img src="../../assets/images/FB.jpg" class="img-fluid" alt="successimg" />
  </div>
</template>
<script>
export default {
  methods: {
    navHotel() {
      this.$router.push("/");
    },
    navOrders() {
      this.$router.push("/orders");
    }
  },
  created() {
    if (this.$store.getters.getAuthData.email === null) {
      this.$router.push("/");
    }
  }
};
</script>
<style >
.Successpage {
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
}
</style>
// import React from "react";

// import classes from "./SuccessPage.module.css";
// import Button from "../Button/Button";
// import Front from "../../images/FB.jpg";

// const success = (props) => {
//   return (
//     <div className={classes.Successpage}>
//       <h2 style={{ color: "var(--primaryText)" }}>
//         Your order has been successfully placed!
//       </h2>
//       <Button btntype="Success" clicked={() => props.history.replace("/")}>
//         Place New Order!
//       </Button>
//       <Button
//         btntype="Success"
//         clicked={() => props.history.replace("/orders")}
//       >
//         Go to My Orders!
//       </Button>
//       <img src={Front} className="img-fluid" alt="Banner" />
//     </div>
//   );
// };

// export default success;
