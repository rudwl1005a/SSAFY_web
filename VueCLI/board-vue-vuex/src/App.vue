<template>
  <div>
    <nav-bar v-bind:isLogin="isLogin" v-bind:userInfo="userInfo"></nav-bar>
    <router-view v-on:call-parent-loginSuccess="loginSuccess"></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  data() {
    return {
      isLogin: false,
      userInfo: {},
    }
  },
  components: { 
    NavBar 
  },
  methods: {
    loginSuccess(userInfo) {
      this.isLogin = true;
      this.userInfo = userInfo;
    }
  },
}
</script>

<style>

</style>
