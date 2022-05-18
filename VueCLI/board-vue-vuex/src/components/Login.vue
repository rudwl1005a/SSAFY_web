<template>
    <div class="container">
        <div class="container-fluid text-sm-center p-5 bg-light">
            <!-- bg-light is background color & p-5 is padding -->
            <h1 class="display-2">SSAFY Board Vuex</h1>
            <p class="lead">새로운 생각, 새로운 사람과 함께 합니다.</p>
        </div>
        <h2 class="mb-3 mt-3">Login</h2>
        <div class="mb-3">
            <input type="email" class="form-control" v-model="$store.state.login.userEmail" placeholder="Email" />
        </div>
        <div class="mb-3">
            <input type="password" class="form-control" v-model="$store.state.login.userPassword" placeholder="Password" />
        </div>
        <div>
            <button @click="login" class="btn btn-primary">로그인</button>
            <router-link to="/register" class="btn btn-success float-end">회원가입</router-link>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";

export default {
    name: "Login",
    // data 사용 X
    // data(){
    //   return {
    //     userEmail: 'dskim@my.com',
    //     userPassword: '1234',

    //     userName: '',
    //     userProfileImageUrl: ''
    //   }
    // },
    methods: {
        async login() {
            // #1 Not JSON Way : application/x-www-form-urlencoded;charset=UTF-8

            // backend 는 @RequestBody X
            // let options = {
            //   headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
            // }

            // application/x-www-form-urlencoded 일 때 param 은 URLSearchParams() 를 이용
            // const params = new URLSearchParams();
            // params.append('userEmail', this.$store.state.login.userEmail);
            // params.append('userPassword', this.$store.state.login.userPassword);

            // #2 JSON Way : application/json
            let loginObj = {
                userEmail: this.$store.state.login.userEmail,
                userPassword: this.$store.state.login.userPassword,
            };

            try {
                // #1
                // let {data} = await  http.post('/login', params, options );

                // #2
                let { data } = await http.post("/login", loginObj);

                console.log("LoginVue: data : ");
                console.log(data);

                // $emit 사용 X
                // login 성공 전달
                //this.$emit('call-parent-loginSuccess', {userName: data.userName, userProfileImageUrl: data.userProfileImageUrl});

                // isLogin 포함 mutator 호출
                this.$store.commit("SET_LOGIN", { isLogin: true, userName: data.userName, userProfileImageUrl: data.userProfileImageUrl });
                // board 로 이동
                this.$router.push("/board");
            } catch (error) {
                console.log("LoginVue: error : ");
                console.log(error);
                if (error.response.status == "404") {
                    this.$alertify.error("이메일 또는 비밀번호를 확인하세요.");
                } else {
                    this.$alertify.error("Opps!! 서버에 문제가 발생했습니다.");
                }
            }
        },
    },
};
</script>

<style>

</style>
