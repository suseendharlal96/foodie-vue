<template>
  <ul class="NavigationItems">
    <router-link tag="li" class="NavigationItem" active-class="active" to="/" exact>
      <a>Hotels</a>
    </router-link>
    <router-link tag="li" class="NavigationItem" active-class="active" to="/orders">
      <a>Orders</a>
    </router-link>
    <router-link tag="li" class="NavigationItem" active-class="active" to="/logout">
      <a>Logout</a>
    </router-link>
    <router-link tag="li" class="NavigationItem" active-class="active" to="/auth">
      <a>SignIn/Signup</a>
    </router-link>
    <button
      :style="{
           outline: 'none',
           borderRadius: '15px',
           padding: '9px',
           float: 'right',
           color: ' var(--primaryText)',
           backgroundColor: 'var(--primaryBg)'}"
    >Theme</button>
  </ul>
</template>
<script>
export default {};
</script>
<style>
.NavigationItems {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;
}

@media (min-width: 500px) {
  .NavigationItems {
    flex-flow: row;
  }
}
.NavigationItem {
  margin: 10px 0;
  box-sizing: border-box;
  display: block;
  width: 100%;
}

.NavigationItem a {
  color: #8f5c2c;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  display: block;
}

.NavigationItem a:hover,
.NavigationItem a:active,
.NavigationItem a.active {
  /* color: #40a4c8; */
}

@media (min-width: 500px) {
  .NavigationItem {
    margin: 0;
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;
  }

  .NavigationItem a{
    color: white;
    height: 100%;
    padding: 16px 10px;
    border-bottom: 4px solid transparent;
  }

  .NavigationItem:active,
  .NavigationItem.active {
    background-color: #8f5c2c;
    border-bottom: 4px solid #40a4c8;
    color: white;
  }
  .NavigationItem:hover {
    background-color: #8f5c2c;
    border-bottom: 4px solid orange;
    color: white;
  }
}
</style>
