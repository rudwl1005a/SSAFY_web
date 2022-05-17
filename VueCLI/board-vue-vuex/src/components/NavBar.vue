<template>
    <!-- 모두 store 를 사용하도록 변경 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div class="container">
            <a class="navbar-brand" href="#">NoStraight</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <!-- a tag class 복사하고 comment -->
                        <router-link v-show="$store.state.login.isLogin" to="/board" class="nav-link">Board</router-link>
                        <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                    </li>
                    <li class="nav-item float-end">
                        <!-- login 성공하면 보여줌 -->
                        <!-- Getters 사용 테스트 -->
                        <router-link v-show="isLoginGetters" to="/user" class="nav-link">My Page</router-link>
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <!-- <a class="nav-link" href="#">Link</a> -->
                    </li>
                </ul>
                <a v-show="$store.state.login.isLogin" class="navbar-brand" href="#">
                    <!-- v-bind 아닌 src는  assets/img 밑에 있는 image 에 대해서 처리하는 데 아무런 문제 없음 개발 / 운영 모두 require 필요 없음.-->
                    <!-- <img src="../assets/img/kang1.jpg" alt="" width="30" height="24" class="d-inline-block align-text-top"> -->

                    <!-- v-bind:src 로 변수를 바인딩 할 때 문제가 생김 -->
                    <!-- 운영시 적용 코드-->
                    <!-- <img v-bind:src="$store.state.login.userProfileImageUrl" alt="" width="30" height="24" class="d-inline-block align-text-top"> -->
                    <!-- build 한 후 noProfile.png, kang1.jpg, lee1.jpg 넣고 각각 로그인해서 테스트 해본다.         -->
                    <!-- require 를 사용하지 않으면 img folder 도 만들어지지 않음 -->

                    <!-- 개발 시 적용 asset 에 이미지 넣고 테스트 -->
                    <!-- build 하지 않고 테스트 할 것이라 require() 를 이용해서 상대경로 url 을 위 img 폴더의 image file의 변형에 맞춰 달라 요청 -->
                    <img v-bind:src="requireImg" alt="" width="34" height="30" style="border-radius: 50%" class="d-inline-block align-text-top" />

                    {{ $store.state.login.userName }}
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    // props 사용 X
    // props: ['login', 'userInfo'],

    // need only for development
    // 대신 require 를 사용해서 테스트하고 이를 위해 computed 를 하나 만듦
    // require(url) <== url image 경로 와 실제 파일 경로를 맞추도록 Hard Coding 요청 ( 이미지 경로가 임의로 이상하게 바뀌므로 그것에 맟줘 달라는 의미)
    // url 자원을 그대로 사용한다는 의미
    // build 하면 server static 에 고정 이미지로 이름이 변경됨
    computed: {
        // getters 이용 테스트
        isLoginGetters() {
            return this.$store.getters.isLogin; // no isLogin()
        },
        requireImg: function () {
            // props 가 아니고 store 를 사용하므로 undefined 를 '' 로 변경
            // this.$store.state.login.userProfileImageUrl == undefined

            // img/kang1.jpg --> img/kang1.XXXXX.jpg 로 변경됨.
            // require( 문자열 ) --> 위 변경 규칙에 맞게 같이 변경해 달라는 요청
            // 문자열이 img/kang1.jpg 라면 동일하게 img/kang1.XXXXX.jpg 로 변경되도록
            // 이처럼 처리하지 않으면 npm run serve 했을 경우 img/kang1.jpg 로의 요청은 404 발생
            // 운영 시점에서는 require 필요없음
            // assets/img 에 미리 이미지를 넣고 build 하지 않음.
            // build 후 img 백엔드 static/img/ 에 kang1.jpg 를 넣고 require 없이 처리
            if (this.$store.state.login.userProfileImageUrl == "") {
                return require("../assets/img/noProfile.png");
            } else {
                return require("../assets" + this.$store.state.login.userProfileImageUrl);
            }
        },
    },
};
</script>

<style>

</style>
