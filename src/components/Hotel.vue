<template>
  <div class="maincart">
    <div id="menubar">
      <h2 id="menu-title">Choose Your Favourite One</h2>
      <p id="sort">
        Sort by &nbsp; &nbsp;
        <select id="sort-metrics" v-model="sortBy" @change="sort($event)">
          <option value disabled>Select</option>
          <option class="sort-option" value="name">Name</option>
          <option class="sort-option" value="rating">Ratings</option>
          <option class="sort-option" value="review">Reviews</option>
        </select>
      </p>
    </div>

    <template v-for="(x, index) in list">
      <div :style="{marginTop:'5%'}" :key="index">
        <restaurant
          :thumbnailImage="x.thumbnail_image"
          :name="x.name"
          :cuisines="x.cuisines"
          :rating="x.rating"
          :reviews="x.reviews"
        ></restaurant>
      </div>
    </template>
  </div>
</template>

<script>
import data from "../data.json";
import RestaurantCard from "./RestaurantCard";
export default {
  data() {
    return {
      list: data,
      sortBy: ""
    };
  },
  methods: {
    sort(event) {
      if (event.target.value === "name") {
        this.list.sort((a, b) => {
          const fName = a.name.toLowerCase();
          const secName = b.name.toLowerCase();
          return fName < secName ? -1 : fName > secName ? 1 : 0;
        });
      }
      if (event.target.value === "review") {
        this.list.sort((a, b) => b.reviews - a.reviews);
      }
      if (event.target.value === "rating") {
        this.list.sort((a, b) => b.rating - a.rating);
      }
    }
  },
  created() {
    console.log(this.list);
  },
  components: {
    restaurant: RestaurantCard
  }
};
</script>

<style >
.maincart {
  /* margin-top: 10px;	
	margin-left: 10px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: var(--primaryBg);
}

#menubar {
  height: auto;
  position: fixed;
  width: 100%;
  background: #ffa3a3;
  padding-left: 15px;
  padding-right: 15px;
}

#menu-title {
  display: flex;
  float: left;
  margin-top: 20px;
  color: #212b2b;
}

.sort-option {
  margin-top: 3px;
}

#sort {
  margin-top: 22px;
  font-size: 18px;
  display: flex;
  float: right;
}

#sort-metrics {
  padding-left: 5px;
  font-size: 15px;
  width: 200px;
  height: 30px;
  border-radius: 10px;
}

.cart {
  cursor: pointer;
  margin: 20px;
  width: min-content;
  padding: 10px;
  border: 1px solid var(--primaryText);
  background: var(--primaryBg);
  box-shadow: 0px 0px 15px 6px var(--primaryText);
}
.cart:hover {
  border: 1px solid #fd0e35;
  box-shadow: 0px 0px 15px 6px red;
}

.name {
  margin-top: 12px;
  margin-right: 20px;
  font-size: 18px;
  color: white;
}

#user {
  display: flex;
  float: right;
  margin: auto;
  padding-right: 40px;
  padding-top: 10px;
}

#logo {
  display: inline;
  float: left;
  margin: auto;
  padding-left: 30px;
  padding-top: 20px;
  color: white;
}

.nav {
  height: 70px;
  background-color: #ec4a4a;
}

.profile {
  height: 35px;
  width: 35px;
  margin-top: 2px;
  display: inline-block;
}

#img {
  border-radius: 50%;
}

#hotel-title {
  max-width: 180px;
}

div.cart p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--primaryText);
  width: 180px;
}

div.cart p:hover {
  text-overflow: clip;
  white-space: normal;
  word-break: break-all;
}
</style>