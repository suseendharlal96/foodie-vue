<template>
  <div>Logout</div>
</template>
<script>
export default {
  created() {
    console.log(this.$store.getters.getAuthData.email);
    const authData = {
      email: null,
      localId: null,
      idToken: null
    };
    this.$store.commit("setAuthData", authData);
    this.$router.push("/");
  }
};
</script> 
// import React, { useEffect } from "react";
// import { Redirect } from "react-router-dom";

// import * as action from "../../../store/actions/index";
// import { connect } from "react-redux";

// const Logout = (props) => {
//   useEffect(() => {
//     props.logout();
//   });
//   return <Redirect to="/" />;
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(action.logout()),
//   };
// };
// export default connect(null, mapDispatchToProps)(Logout);
