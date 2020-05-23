<template>
  <div class="Order">
    <p :style="{ color:'var(--primaryText)'} ">
      <strong :style="{ color:'var(--primaryTheme)'} ">Hotel Name:</strong>
      {{orderData.orderData.name}}
    </p>
    <p :style="{ color:'var(--primaryText)'} ">
      <strong :style="{ color:'var(--primaryTheme)'} ">Address:</strong>
      {{orderData.orderData.address}}
    </p>
    <p :style="{ color:'var(--primaryTheme)'} ">
      Items ordered:
      <template v-for="(item, index) in orderData.orderData.menu">
        <span
          :key="index"
          :style="{
           textTransform: 'capitalize',
           display: 'inline-block',
           margin: '0 8px', 
           border: '1px solid  var(--secondaryText)',
           color: 'var(--primaryText)',
           padding: '5px',
         }"
        >{{item.name}} ({{item.quantity}})</span>
      </template>
    </p>
    <p :style="{ color:'var(--primaryTheme)'} ">
      Total Price:
      <strong :style="{ color:'var(--primaryText)'} ">
        {{"\u20B9"}}
        {{orderData.orderData.total}}
      </strong>
    </p>
    <p :style="{ color: 'var(--primaryTheme)' }">
      Ordered on:
      <strong
        :style="{ color: 'var(--primaryText)' }"
      >{{new Date(orderData.orderDate).toString()}}</strong>
    </p>
    <div>
      <button class="btn btn-primary" @click="details">Details</button>
      <button class="btn btn-warning" @click="edit">Edit Order(Same hotel)</button>
      <button class="btn btn-warning" @click="editHotel">Edit Order(Different hotel)</button>
      <Modal v-if="showModal" :show="showModal" @closeModal="showModal=false">
        <OrderDetail
          :custDetails="orderData.customerDetails"
          :menu="orderData.orderData.menu"
          :total="orderData.orderData.total"
          :date="orderData.orderDate"
        ></OrderDetail>
      </Modal>
      <!-- <Route
           path={props.match.path + "/details"}
           render={() => (
             <Modal show={continuePurchase} closeModal={closeModalHandler}>
               <OrderDetail
                 id={props.id}
                 date={props.date}
                 custDetails={props.custDetails}
                 menu={props.orderData.menu}
                 price={props.orderData.total}
                 delete={props.delete}
               />
             </Modal>
           )}
      />-->
    </div>
  </div>
</template>
<script>
import OrderDetail from "./OrderDetail";
import Modal from "../Modal/Modal";
export default {
  props: ["orderData"],
  data() {
    return {
      showModal: false
    };
  },
  components: {
    OrderDetail: OrderDetail,
    Modal: Modal
  },
  methods: {
    details() {
      this.showModal = true;
    },
    edit() {},
    editHotel() {}
  },
  created() {
    console.log(this.orderData);
  }
};
</script>
<style >
.Order {
  width: 80%;
  border: 1px solid var(--primaryText);
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
}
</style>
// import React, { useState } from "react";
// import { Route } from "react-router-dom";

// import Modal from "../../components/Modal/Modal";
// import OrderDetail from "./OrderDetail/OrderDetail";
// import styles from "./Order.module.css";
// import Button from "../../pages/Button/Button";

// const Order = (props) => {
//   const [continuePurchase, setcontinuePurchase] = useState(false);

//   const closeModalHandler = () => {
//     setcontinuePurchase(false);
//     props.history.replace("/orders");
//   };

//   const details = () => {
//     setcontinuePurchase(true);
//     props.history.replace("/orders/details");
//   };

//   const edit = () => {
//     props.history.replace(`/order/${props.orderData.name}/${props.id}/edit`);
//   };

//   const editHotel = () => {
//     props.history.replace(`/hotel/${props.id}/edit`);
//   };

//   const ingredientOutput = props.orderData.menu.map((ig) => {
//     return (
//       <span
//         style={{
//           textTransform: "capitalize",
//           display: "inline-block",
//           margin: "0 8px",
//           border: "1px solid  var(--secondaryText)",
//           color: "var(--primaryText)",
//           padding: "5px",
//         }}
//         key={ig.name}
//       >
//         {ig.name} ({ig.quantity})
//       </span>
//     );
//   });
//   return (
//     <div className={styles.Order}>
//       <p style={{ color: "var(--primaryText)" }}>
//         <strong style={{ color: "var(--primaryTheme)" }}>Hotel Name: </strong>
//         {props.orderData.name}
//       </p>
//       <p style={{ color: "var(--primaryText)" }}>
//         <strong style={{ color: "var(--primaryTheme)" }}>Address: </strong>
//         {props.orderData.address}
//       </p>
//       <p style={{ color: "var(--primaryTheme)" }}>
//         Items ordered: {ingredientOutput}
//       </p>
//       <p style={{ color: "var(--primaryTheme)" }}>
//         Total Price:{" "}
//         <strong  style={{ color: "var(--primaryText)" }}>
//           {"\u20B9"}
//           {props.orderData.total}
//         </strong>
//       </p>
//       <p  style={{ color: "var(--primaryTheme)" }}>
//         Ordered on:
//         <strong  style={{ color: "var(--primaryText)" }}>{new Date(props.date).toString()}</strong>
//       </p>
//       <div>
//         <button className="btn btn-primary" onClick={details}>
//           Details
//         </button>
//         <Button btntype="Success" clicked={edit}>
//           Edit Order(Same hotel)
//         </Button>
//         <Button btntype="Success" clicked={editHotel}>
//           Edit Order(Different hotel)
//         </Button>
//         <Route
//           path={props.match.path + "/details"}
//           render={() => (
//             <Modal show={continuePurchase} closeModal={closeModalHandler}>
//               <OrderDetail
//                 id={props.id}
//                 date={props.date}
//                 custDetails={props.custDetails}
//                 menu={props.orderData.menu}
//                 price={props.orderData.total}
//                 delete={props.delete}
//               />
//             </Modal>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default Order;
