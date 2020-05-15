<template>
  <!-- <div>orders</div> -->
  <div id="content">
    <div class="row">
      <div class="col-md-8">
        <div :style="{backgroundColor: 'black' }">
          <template v-for="(item, index) in newList">
            <h1 class="hname" :key="index + 'name'">{{item.name}}</h1>
          </template>
          <template v-for="(item, index) in newList">
            <h5 class="aname" :key="index + 'address'">
              <i class="fa fa-map-marker" :style="{ fontSize: 18 }"></i>
              {{ item.address}}
            </h5>
          </template>
        </div>
        <div id="items">
          <center>
            <h2 :style="{ color: 'var(--primaryText)' }">Order Now</h2>
          </center>
          <br />
          <template v-for="(item,index) in newList[0].menu">
            <Menu
              :key="index+'menu'"
              :ind="item.id"
              :desc="item.description"
              :quantity="item.quantity"
              :price="item.price"
              :name="item.name"
              @addItem="addHandler($event,item.id)"
            ></Menu>
          </template>
        </div>
      </div>
      <div class="col-md-4">
        <div id="logo"></div>
        <div id="right">
          <div id="right-in">
            <h4 :style="{ color: 'var(--primaryText)' }">My Cart</h4>
            <template v-for="(cart,index) in newList[0].menu">
              <template v-if="cart.quantity>0">
                <MyCart
                  :key="index+'cart'"
                  :ind="cart.id"
                  :name="cart.name"
                  :price="cart.price"
                  :quantity="cart.quantity"
                  @increment="incrementQuantity(cart.id)"
                  @decrement="decrementQuantity(cart.id)"
                ></MyCart>
              </template>
            </template>

            <div id="total">
              <p :style="{ color: 'var(--primaryText)' }" id="total">
                Grand Total:
                <span class="spn">{{"\u20B9"}}{{totalPrice}}</span>
              </p>
              <button
                :disabled="totalPrice>0?false:true"
                :style=" [totalPrice>0?{cursor:'pointer'}:{cursor:'no-drop'}]"
                @click="placeOrder"
                id="pay"
              >Order</button>
              <button id="pay" @click="navToHotel">Back to Hotels</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import data from "../../data.json";
import Menu from "./Menu";
import Cart from "./Cart";
export default {
  data() {
    return {
      list: data,
      newList: null,
      totalPrice: 0
    };
  },
  methods: {
    addHandler(price, id) {
      console.log(price, id);
      const b = this.calcQuantity("add", id);
      this.newList = b;
      console.log(this.newList);
      this.total();
    },
    total() {
      let tot = 0;
      this.newList[0].menu.map(m => {
        tot = tot + m.price * m.quantity;
      });
      this.totalPrice = tot;
    },
    calcQuantity(type, id) {
      const b = [...this.newList];
      b.map(m => {
        m.menu.map(me => {
          if (me.id === id) {
            me.quantity = type === "add" ? me.quantity + 1 : me.quantity - 1;
          }
        });
      });
      console.log(b);
      return b;
    },
    incrementQuantity(id) {
      console.log(id);
      const b = this.calcQuantity("add", id);
      console.log(b);
      this.newList = b;
      this.total();
    },

    decrementQuantity(id) {
      const b = this.calcQuantity("less", id);
      this.newList = b;
      this.total();
    },
    navToHotel() {
      this.$router.push("/");
    },
    placeOrder() {
      this.$router.push("/checkout");
    }
  },
  created() {
    console.log(this.$route.params.hotel);
    const hotelName = this.$route.params.hotel;
    const List = this.list.filter(rec => rec.name === hotelName);
    console.log(List);
    const arr = [];
    List.map(list => {
      arr.push({
        id: list.id,
        name: list.name,
        address: list.address,
        menu: list.menu.map(m => {
          return {
            id: m.id,
            name: m.name,
            price: m.price,
            description: m.desc,
            quantity: 0
          };
        })
      });
    });
    console.log(arr);
    this.newList = arr;
  },
  components: {
    Menu: Menu,
    MyCart: Cart
  }
};
</script>
<style>
@import "../../theme.css";
body {
  background-color: var(--primaryBg);
}

* {
  margin: 0;
  padding: 0;
}

#content {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}

.nav {
  height: 70px;
  background-color: #ec4a4a;
}

#img {
  border-radius: 50%;
}
.name {
  margin-top: 12px;
  margin-right: 20px;
  font-size: 18px;
  color: white;
}
#logo {
  display: inline;
  float: left;
  margin: auto;
  padding-left: 30px;
  padding-top: 20px;
  color: white;
}
#user {
  display: flex;
  float: right;
  margin: auto;
  padding-right: 40px;
  padding-top: 10px;
}
.profile {
  height: 35px;
  width: 35px;
  margin-top: 2px;
  display: inline-block;
}

#head {
  height: 15vh;
  width: 75%;
  background-color: #332323;
  padding-top: 20px;
  padding-left: 20px;
}

#total {
  padding-top: 10px;
}

.hname {
  color: white;
  margin-left: 30px;
  margin-bottom: 7px;
}

.aname {
  color: white;
  margin-left: 30px;
  margin-top: 2px;
}

#panel {
  width: 25%;
  height: 100vh;
  background-color: gainsboro;
}

#items {
  margin-top: 55px;
  padding-left: 70px;
  margin-right: 100px;
}

#items p {
  margin-top: 10px;
  font-size: 15px;
  color: var(--primaryTheme);
  max-width: 700px;
}

.desc {
  display: flex;
}

.btn {
  width: 80px;
  padding: 7px;
}

.amount {
  margin-top: -10px !important;
  padding-bottom: 10px;
  font-weight: bold;
  color: var(--primaryText) !important;
  border-bottom: 1px solid var(--primaryText);
}

.fname {
  padding-top: 10px;
  color: var(--primaryText);
}

#right-in {
  padding: 30px;
  margin-left: 20px;
}

#right {
  font-size: 23px;
  background: var(--primaryBg);
  box-shadow: 0px 0px 15px 6px #283e530c;
}

#pitem {
  padding-top: 20px;
  margin-right: 70px;
  color: darkslategray;
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
  font-size: 15px;
}
.ip {
  height: 30px;
  width: 30px;
  font-size: 15px;
  margin-left: 5px;
}

.spn {
  margin-left: 10px;
}
#tx-w {
  height: 30px;
  padding: 2px;
  width: 30px;
}

#pay {
  width: 80%;
  height: 40px;
  margin: 15px;
  background-color: #ec4a4a;
  color: #fff;
  font-size: 16px;
}
#pay:disabled {
  background-color: grey;
  color: #332323;
}
</style>