<template>
  <div>
    <div>
      <h2 :style="{ color: 'var(--primaryText)' }">My Orders:</h2>
      <div :style="{ fontWeight: 'bold', color: 'var(--primaryTheme)' }">Filter By:</div>
      <div class="float-right" :style="{ marginRight: '20px' }">
        <label
          :style="{ marginRight: '15px', color: 'var(--primaryText)' }"
          for="dispmode"
        >Display Mode:</label>
        <span>
          <select id="dispmode" :value="mode">
            <option value="list">List</option>
            <option value="chart">Chart</option>
          </select>
        </span>
      </div>
      <span :style="{ marginRight: '10px', color: 'var(--primaryText)' }">
        <label :style="{ marginRight: '10px' }">
          <strong :style="{ color: 'var(--primaryText)' }">Date:</strong>
        </label>
        old:
        <input
          type="radio"
          name="price"
          :checked="filter==='old'"
          @change="filterOrder('old')"
        />
        new:
        <input
          type="radio"
          name="price"
          :checked="filter==='new'"
          @change="filterOrder('new')"
        />
      </span>
      <span :style="{ marginRight: '10px', color: 'var(--primaryText)' }">
        <label :style="{ marginRight: '10px' }">
          <strong :style="{ color: 'var(--primaryText)' }">Hotel Name:</strong>
        </label>
        A-z:
        <input
          type="radio"
          name="price"
          :checked="filter==='asc'"
          @change="filterOrder('asc')"
        />
        Z-a:
        <input
          type="radio"
          name="price"
          :checked="filter==='desc'"
          @change="filterOrder('desc')"
        />
      </span>
      <span :style="{ color: 'var(--primaryText)' }">
        <label :style="{ marginRight: '10px' }">
          <strong :style="{ color: 'var(--primaryText)' }">Price:</strong>
        </label>
        low:
        <input
          type="radio"
          name="price"
          :checked="filter==='low'"
          @change="filterOrder('low')"
        />
        high:
        <input
          type="radio"
          name="price"
          :checked="filter==='high'"
          @change="filterOrder('high')"
        />
      </span>
    </div>
    <div>
      <template v-if="orderData && orderData.length">
        <template v-for="(item, index) in orderData">
          <Order :key="index" :orderData="item"></Order>
        </template>
      </template>
      <p v-else :style="{ color: 'var(--primaryText)' }">Loading...</p>
    </div>
  </div>
</template>
<script>
import Order from "./Order";
import OrderDetail from "./OrderDetail";
export default {
  data() {
    return {
      orderData: [],
      mode: "list",
      filter: ""
    };
  },
  methods: {
    filterOrder(val) {
      console.log(val);
      this.filter = val;
      if (val === "low") {
        this.orderData.sort((a, b) => +a.orderData.total - +b.orderData.total);
      } else if (val === "high") {
        this.orderData.sort((a, b) => +b.orderData.total - +a.orderData.total);
      } else if (val === "old") {
        this.orderData.sort(
          (a, b) =>
            new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
        );
      } else if (val === "new") {
        this.orderData.sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
      } else if (val === "asc") {
        this.orderData.sort((a, b) => {
          const fName = a.orderData.name.toLowerCase();
          const secName = b.orderData.name.toLowerCase();
          return fName < secName ? -1 : fName > secName ? 1 : 0;
        });
      } else if (val === "desc") {
        this.orderData.sort((a, b) => {
          const fName = a.orderData.name.toLowerCase();
          const secName = b.orderData.name.toLowerCase();
          return fName < secName ? 1 : fName > secName ? -1 : 0;
        });
      }
    }
  },
  components: {
    Order: Order,
    OrderDetail: OrderDetail
  },
  created() {
    const authData = this.$store.getters.getAuthData;
    if (authData.idToken) {
      const queryParams =
        "?auth=" +
        authData.idToken +
        '&orderBy="userId"&equalTo="' +
        authData.localId +
        '"';
      this.$http
        .get("https://foodie-vue.firebaseio.com/orders.json" + queryParams)
        .then(
          response => {
            console.log("asd", response);
            for (let key in response.body) {
              this.orderData.push({ ...response.body[key], id: key });
              console.log(this.orderData);
            }
          },
          err => console.log(err)
        );
    } else {
      this.$router.push("/");
    }
  }
};
</script>
<style >
</style>
//  import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";

// // import { Bar, Pie, Doughnut } from "react-chartjs-2";

// import BarChart from "./charts/Bar";
// import PieChart from "./charts/Pie";
// import LineChart from "./charts/Line";
// import Order from "../Orders/Order";
// import * as action from "../../store/actions/index";
// import Button from "../../pages/Button/Button";

// const Orders = (props) => {
//   const [priceCheck, setpriceCheck] = useState("");
//   const [dateCheck, setdateCheck] = useState("");
//   const [alphaCheck, setalphaCheck] = useState("");
//   const [mode, setMode] = useState("list");

//   useEffect(() => {
//     if (!props.token) {
//       props.fetchOrders(
//         localStorage.getItem("token"),
//         localStorage.getItem("userId")
//       );
//     } else {
//       props.fetchOrders(props.token, props.localId);
//     }
//   }, []);

//   const changeMode = (event) => {
//     event.persist();
//     setMode(event.target.value);
//   };

//   const sort = (event) => {
//     if (event.target.value === "low") {
//       props.orders.sort((a, b) => +a.orderData.total - +b.orderData.total);
//       setpriceCheck(event.target.value);
//       setdateCheck("");
//       setalphaCheck("");
//     } else if (event.target.value === "high") {
//       props.orders.sort((a, b) => +b.orderData.total - +a.orderData.total);
//       setpriceCheck(event.target.value);
//       setdateCheck("");
//       setalphaCheck("");
//     } else if (event.target.value === "old") {
//       props.orders.sort(
//         (a, b) =>
//           new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
//       );
//       setpriceCheck("");
//       setdateCheck(event.target.value);
//       setalphaCheck("");
//     } else if (event.target.value === "new") {
//       props.orders.sort(
//         (a, b) =>
//           new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
//       );
//       setpriceCheck("");
//       setdateCheck(event.target.value);
//       setalphaCheck("");
//     } else if (event.target.value === "asc") {
//       props.orders.sort((a, b) =>
//         compareName(a.orderData.name, b.orderData.name)
//       );
//       setalphaCheck(event.target.value);
//       setpriceCheck("");
//       setdateCheck("");
//     } else if (event.target.value === "desc") {
//       props.orders.sort((a, b) =>
//         compareName(b.orderData.name, a.orderData.name)
//       );
//       setalphaCheck(event.target.value);
//       setpriceCheck("");
//       setdateCheck("");
//     }
//   };

//   const compareName = (a, b) => {
//     a = a.toLowerCase();
//     b = b.toLowerCase();
//     return a < b ? -1 : a > b ? 1 : 0;
//   };

//   const deleteHandler = (orderId) => {
//     const token = props.token ? props.token : localStorage.getItem("token");
//     props.deleteOrders(orderId, { ...props }, token);
//   };

//   let filter = null;
//   let error = null;
//   if (props.error) {
//     error = (
//       <div>
//         <p>{props.error}</p>
//         <Button
//           btntype="Success"
//           clicked={() => props.history.replace("/auth")}
//         >
//           click to Signup/in
//         </Button>
//       </div>
//     );
//   }
//   if (!props.error && props.orders && props.orders.length > 0) {
//     filter = (
//       <div>
//         <h2 style={{ color: "var(--primaryText)" }}>My Orders:</h2>
//         <div style={{ fontWeight: "bold", color: "var(--primaryTheme)" }}>
//           Filter By:
//         </div>
//         <div className="float-right" style={{ marginRight: "20px" }}>
//           <label
//             style={{ marginRight: "15px", color: "var(--primaryText)" }}
//             htmlFor="dispmode"
//           >
//             Display Mode:
//           </label>
//           <span>
//             <select
//               name="dispmode"
//               id="dispmode"
//               value={mode}
//               onChange={changeMode}
//             >
//               <option value="list">List</option>
//               <option value="chart">Chart</option>
//             </select>
//           </span>
//         </div>
//         <span style={{ marginRight: "10px", color: "var(--primaryText)" }}>
//           <label style={{ marginRight: "10px" }}>
//             <strong style={{ color: "var(--primaryText)" }}>Date:</strong>
//           </label>
//           old:
//           <input
//             type="radio"
//             name="price"
//             value="old"
//             onChange={(event) => sort(event)}
//             checked={dateCheck === "old"}
//           />
//           new:
//           <input
//             type="radio"
//             name="price"
//             value="new"
//             onChange={(event) => sort(event)}
//             checked={dateCheck === "new"}
//           />
//         </span>
//         <span style={{ marginRight: "10px", color: "var(--primaryText)" }}>
//           <label style={{ marginRight: "10px" }}>
//             <strong style={{ color: "var(--primaryText)" }}>Hotel Name:</strong>
//           </label>
//           A-z:
//           <input
//             type="radio"
//             name="price"
//             value="asc"
//             onChange={(event) => sort(event)}
//             checked={alphaCheck === "asc"}
//           />
//           Z-a:
//           <input
//             type="radio"
//             name="price"
//             value="desc"
//             onChange={(event) => sort(event)}
//             checked={alphaCheck === "desc"}
//           />
//         </span>
//         <span style={{ color: "var(--primaryText)" }}>
//           <label style={{ marginRight: "10px" }}>
//             <strong style={{ color: "var(--primaryText)" }}>Price:</strong>
//           </label>
//           low:
//           <input
//             type="radio"
//             name="price"
//             value="low"
//             onChange={(event) => sort(event)}
//             checked={priceCheck === "low"}
//           />
//           high:
//           <input
//             type="radio"
//             name="price"
//             value="high"
//             onChange={(event) => sort(event)}
//             checked={priceCheck === "high"}
//           />
//         </span>
//       </div>
//     );
//   } else if (!props.error) {
//     filter = <p style={{ color: "var(--primaryText)" }}>Loading...</p>;
//   } else {
//     filter = (
//       <p style={{ color: "var(--primaryText)" }}>No orders placed yet!</p>
//     );
//   }
//   let a = [];
//   const lineColor = "var(--primaryText)";
//   let ind = 1;
//   for (let i = 0; i < 12; i++) {
//     a.push(0);
//   }
//   let days = [];
//   const daysInMonth = (month, year) => {
//     return new Date(year, month, 0).getDate();
//   };
//   for (
//     let i = 0;
//     i < daysInMonth(new Date().getMonth() + 1, new Date().getFullYear());
//     i++
//   ) {
//     days.push(0);
//   }
//   let usualDays = [];
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   for (
//     let i = 1;
//     i <= daysInMonth(new Date().getMonth() + 1, new Date().getFullYear());
//     i++
//   ) {
//     if (i < 4) {
//       if (i === 1) {
//         usualDays.push(i + "st " + months[new Date().getMonth()]);
//       } else if (i === 2) {
//         usualDays.push(i + "nd " + months[new Date().getMonth()]);
//       } else if (i === 3) {
//         usualDays.push(i + "rd " + months[new Date().getMonth()]);
//       }
//     } else if (i >= 4 && i < 19) {
//       usualDays.push(i + "th " + months[new Date().getMonth()]);
//     } else if (i >= 19) {
//       if (i.toString().endsWith("1")) {
//         usualDays.push(i + "st " + months[new Date().getMonth()]);
//       } else if (i.toString().endsWith("2")) {
//         usualDays.push(i + "nd " + months[new Date().getMonth()]);
//       } else if (i.toString().endsWith("3")) {
//         usualDays.push(i + "rd " + months[new Date().getMonth()]);
//       } else {
//         usualDays.push(i + "th " + months[new Date().getMonth()]);
//       }
//     }
//   }
//   let hotel = [];
//   let hotelOrder = [];
//   let hotelPrice = [];
//   let bgColors = [];
//   while (bgColors.length < 12) {
//     do {
//       var color = Math.floor(Math.random() * 1000000 + 1);
//     } while (bgColors.indexOf(color) >= 0);
//     bgColors.push("#" + ("265BCF" + color.toString(16)).slice(-6));
//   }
//   let hoverColors = [];
//   while (hoverColors.length < 12) {
//     do {
//       var color = Math.floor(Math.random() * 1000000 + 1);
//     } while (hoverColors.indexOf(color) >= 0);
//     hoverColors.push("#" + ("FFFFF" + color.toString(16)).slice(-6));
//   }

//   if (props.orders && props.orders.length) {
//     props.orders.map((or, i) => {
//       const month = or.orderDate.split("-")[1].replace(/0/g, "");
//       const date = new Date(or.orderDate).getDate();
//       days[date - 1] = days[date - 1] + 1;
//       a[month - 1] = a[month - 1] + 1;
//       if (ind === 1) {
//         hotel.push(or.orderData.name);
//         hotelOrder.push(0);
//         hotelPrice.push(0);
//         ind = ind + 1;
//       } else {
//         const hIndex = hotel.findIndex((data) => data === or.orderData.name);
//         if (hIndex === -1) {
//           hotel.push(or.orderData.name);
//           hotelOrder.push(0);
//           hotelPrice.push(0);
//         }
//       }
//       if (hotel && hotel.length) {
//         const index = hotel.findIndex((data) => data === or.orderData.name);
//         hotelOrder[index] = hotelOrder[index] + 1;
//         hotelPrice[index] = hotelPrice[index] + or.orderData.total;
//       }
//     });
//   }

//   const listData = (
//     <div style={{ height: "530px", width: "100%", overflow: "auto" }}>
//       {props.token || localStorage.getItem("token") !== null
//         ? props.orders.map((order) => (
//             <Order
//               {...props}
//               key={order.id}
//               id={order.id}
//               custDetails={order.customerDetails}
//               date={order.orderDate}
//               orderData={order.orderData}
//               delete={() => deleteHandler(order.id)}
//             />
//           ))
//         : null}
//     </div>
//   );

//   const chartData = (
//     <div
//       className="col-md-12"
//       style={{ height: "530px", width: "100%", overflow: "auto" }}
//     >
//       <div className="row">
//         <div className="col-md-6">
//           <BarChart
//             label={"Orders(based on hotel)"}
//             hotel={hotel}
//             hotelOrder={hotelOrder}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//         <div className="col-md-6">
//           <PieChart
//             label={"Orders(based on hotel)"}
//             hotel={hotel}
//             hotelOrder={hotelOrder}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//       </div>
//       <hr />
//       <div className="row">
//         <div className="col-md-6">
//           <BarChart
//             label={"Orders(based on hotel & price)"}
//             hotel={hotel}
//             hotelOrder={hotelPrice}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//         <div className="col-md-6">
//           <PieChart
//             label={"Orders(based on hotel & price)"}
//             hotel={hotel}
//             hotelOrder={hotelPrice}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//       </div>
//       <hr />
//       <div className="row">
//         <div className="col-md-6">
//           <LineChart
//             label={"Orders(based on hotel)"}
//             hotel={hotel}
//             hotelOrder={hotelOrder}
//             lineColor={lineColor}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//         <div className="col-md-6">
//           <LineChart
//             label={"Orders(based on hotel & price)"}
//             hotel={hotel}
//             hotelOrder={hotelPrice}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//       </div>
//       <hr />
//       <div className="row">
//         <div className="col-md-6">
//           <BarChart
//             label={"Orders(based on months)"}
//             hotel={[
//               "Jan",
//               "Feb",
//               "Mar",
//               "Apr",
//               "May",
//               "Jun",
//               "Jul",
//               "Aug",
//               "Sep",
//               "Oct",
//               "Nov",
//               "Dec",
//             ]}
//             hotelOrder={a}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//         <div className="col-md-6">
//           <PieChart
//             label={"Orders(based on months)"}
//             hotel={[
//               "Jan",
//               "Feb",
//               "Mar",
//               "Apr",
//               "May",
//               "Jun",
//               "Jul",
//               "Aug",
//               "Sep",
//               "Oct",
//               "Nov",
//               "Dec",
//             ]}
//             hotelOrder={a}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-8">
//           <LineChart
//             label={"Orders(based on days)"}
//             hotel={usualDays}
//             hotelOrder={days}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-8">
//           <PieChart
//             label={"Orders(based on days)"}
//             hotel={usualDays}
//             hotelOrder={days}
//             bgColors={bgColors}
//             hoverColors={hoverColors}
//           />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       {error}
//       {filter}
//       {mode === "list"
//         ? listData
//         : props.orders && props.orders.length
//         ? chartData
//         : null}
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     orders: state.orderReducer.actualOrders,
//     token: state.authReducer.idToken,
//     localId: state.authReducer.localId,
//     error: state.orderReducer.error,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId)),
//     deleteOrders: (id, props, token) =>
//       dispatch(action.deleteOrder(id, props, token)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Orders);
