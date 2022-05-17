<template>
    <div>
        <nav-bar />
        <router-view></router-view>
        <!-- 별도의 props 와 v-on 필요 없음.
        <nav-bar v-bind:isLogin="isLogin" v-bind:userInfo="userInfo"/>
        <router-view v-on:call-parent-loginSuccess="loginSuccess"></router-view> -->
    </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
    name: "App",
    // data 사용 X
    // data(){
    //   return {
    //     isLogin: false,
    //     userInfo: {}
    //   }
    // },
    components: {
        NavBar,
    },
    // methods 사용 X
    // methods:{
    //   loginSuccess( userInfo ){
    //     this.isLogin = true;
    //     this.userInfo = userInfo;
    //   }
    // }
};
</script>

<style>

</style>
