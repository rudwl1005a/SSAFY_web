<template>
    <div class="container mt-3">
        <div class="mb-3 d-flex justify-content-center">
            <h1 class="display-4" style="color: blue">SSAFY Board</h1>
        </div>
        <div class="mb-3">
            <h2>Login</h2>
        </div>
        <div class="mb-3">
            <label for="userEmail" class="form-label">Email</label>
            <input v-model="userEmail" type="email" class="form-control" id="userEmail" name="userEmail">
        </div>
        <div class="mb-3">
            <label for="userPassword" class="form-label">제목</label>
            <input v-model="userPassword" type="password" class="form-control" id="userPassword" name="userPassword">
        </div>
        <div>
            <button @click="login" class="btn btn-primary">로그인</button>
            <!-- <a href="/register" class="btn btn-success">회원가입</a> -->
        </div>	
    </div>
</template>

<script>
import Vue from 'vue'
import VueAlertify from 'vue-alertify'
import http from '@/common/axios.js'

Vue.use(VueAlertify);

export default {
    data() {
        return {
            userEmail: 'hong@gildong.com',
            userPassword: '1234',
        }
    },
    methods: {
        async login() {
            try {
                let response = await http.post('/login', { userEmail: this.userEmail, userPassword: this.userPassword });
                let { data } = response;
                
                this.$emit('call-parent-loginSuccess', { userName: data.userName, userProfileImageUrl: data.userProfileImageUrl });
                this.$router.push("/board");

            } catch (error) {
                console.error(error);
                if(error.response.state == '404'){
                    this.$alertify.error('이메일 또는 비밀번호를 확인하세요.');
                } else {
                    this.$alertify.error('서버에 오류가 발생했습니다.');
                }
            }

        }
    }
}
</script>

<style>

</style>