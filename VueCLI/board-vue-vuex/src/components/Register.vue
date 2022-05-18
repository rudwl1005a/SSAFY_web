<template>
    <div class="container">
        <div class="container-fluid text-sm-center p-5 bg-light">
            <!-- bg-light is background color & p-5 is padding -->
            <h1 class="display-2">SSAFY Board vuex</h1>
            <p class="lead">가입하세요.</p>
        </div>
        <h2 class="mb-3 mt-3">Register</h2>
        <div class="mb-3">
            <input
                type="name"
                class="form-control"
                placeholder="Enter User Name"
                :class="{ 'is-valid': isUserNameFocusAndValid, 'is-invalid': isUserNameFocusAndInvalid }"
                v-model="userName"
                @input="validateUserName"
                @focus="isUserNameFocus = true"
            />
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">올바른 이름을 입력해 주세요.</div>
        </div>
        <div class="mb-3">
            <!-- 각각의 input 이 focus 를 가진 경우에만 반응하도록 해야하고, click 할 때마다 valid 확인 필요 -->
            <input type="email" class="form-control" placeholder="Enter Email" 
                :class="{ 'is-valid': isUserEmailFocusAndValid, 'is-invalid': isUserEmailFocusAndInValid }" 
                v-model="userEmail" @input="validateEmail" @focus="isUserEmailFocus = true" />
            <!-- 테스트 코드 -->
            <!-- {{isUserEmailFocus}} - {{ isUserEmailFocusAndValid }} - {{ isUserEmailFocusAndInValid }} -->
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">올바른 Email 을 입력해 주세요.</div>
        </div>
        <div class="mb-3">
            <input
                type="password"
                class="form-control"
                placeholder="Enter Password"
                :class="{ 'is-valid': isUserPasswordFocusAndValid, 'is-invalid': isUserPasswordFocusAndInvalid }"
                v-model="userPassword"
                @input="validatePassword"
                @focus="isUserPasswordFocus = true"
            />
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">1개 이상의 특수문자, 대소문자 및 숫자를 포함하고 8자리 이상이여야 합니다.</div>
        </div>
        <div class="mb-3">
            <input
                type="password"
                class="form-control"
                placeholder="Conform Password"
                :class="{ 'is-valid': isUserPassword2FocusAndValid, 'is-invalid': isUserPassword2FocusAndInvalid }"
                v-model="userPassword2"
                @input="validatePassword2"
                @focus="isUserPassword2Focus = true"
            />
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">비밀번호가 일치하지 않습니다.</div>
        </div>

        <div class="mb-3">
            <div class="form-check form-check-inline" v-for="(code, index) in codeList" :key="index">
                <input class="form-check-input" :value="code.code" type="radio" v-model="userClsf" />
                <label class="form-check-label">{{ code.codeName }}</label>
            </div>
        </div>
        <div>
            <button @click="register" class="btn btn-primary">가입하기</button>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";

export default {
    // data 사용 X
    data() {
        return {
            // v-model
            userName: "",
            userEmail: "",
            userPassword: "",
            userPassword2: "",

            // focus
            isUserNameFocus: false,
            isUserEmailFocus: false,
            isUserPasswordFocus: false,
            isUserPassword2Focus: false,

            // validation
            isUserNameValid: false,
            isUserEmailValid: false,
            isUserPasswordValid: false,
            isUserPassword2Valid: false,

            // 회원 구분
            groupCode: "001",
            codeList: [],
            userClsf: "001", // 일반회원 default
        };
    },
    computed: {
        isUserNameFocusAndValid() {
            return this.isUserNameFocus && this.isUserNameValid;
        },
        isUserNameFocusAndInvalid() {
            return this.isUserNameFocus && !this.isUserNameValid;
        },
        isUserEmailFocusAndValid() {
            return this.isUserEmailFocus && this.isUserEmailValid;
        },
        isUserEmailFocusAndInValid() {
            return this.isUserEmailFocus && !this.isUserEmailValid;
        },
        isUserPasswordFocusAndValid() {
            return this.isUserPasswordFocus && this.isUserPasswordValid;
        },
        isUserPasswordFocusAndInvalid() {
            return this.isUserPasswordFocus && !this.isUserPasswordValid;
        },
        isUserPassword2FocusAndValid() {
            return this.isUserPassword2Focus && this.isUserPassword2Valid;
        },
        isUserPassword2FocusAndInvalid() {
            return this.isUserPassword2Focus && !this.isUserPassword2Valid;
        },
    },
    methods: {
        validateUserName() {
            this.isUserNameValid = this.userName.length > 0 ? true : false;
            console.log(this.isUserNameValid);
        },
        validateEmail() {
            // ^ 시작일치, $ 끝 일치
            // {2, 3} 2개 ~ 3개
            // * 0회 이상, + 1회 이상
            // [-_.] - 또는 _ 또는 .
            // ? 없거나 1회
            let regexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            this.isUserEmailValid = regexp.test(this.userEmail) ? true : false;
            console.log(this.isUserEmailValid);
        },
        validatePassword() {
            let patternEngAtListOne = new RegExp(/[a-zA-Z]+/); // + for at least one
            let patternSpeAtListOne = new RegExp(/[~!@#$%^&*()_+|<>?:{}]+/); // + for at least one
            let patternNumAtListOne = new RegExp(/[0-9]+/); // + for at least one

            this.isUserPasswordValid = patternEngAtListOne.test(this.userPassword) 
                                        && patternSpeAtListOne.test(this.userPassword) 
                                        && patternNumAtListOne.test(this.userPassword) 
                                        && this.userPassword.length >= 8 ? true : false;
        },
        validatePassword2() {
            this.isUserPassword2Valid = this.userPassword == this.userPassword2 ? true : false;
        },
        async register() {
            if (!this.isUserEmailValid || !this.isUserPasswordValid || !this.isUserPassword2Valid) return;

            let registerObj = {
                userName: this.userName,
                userEmail: this.userEmail,
                userPassword: this.userPassword,
                userClsf: this.userClsf,
            };
            try {
                let { data } = await http.post("/register", registerObj); // JSON Request, { params : registerObj } X params 를 쓰면 get => query string
                console.log("RegisterVue: data : ");
                console.log(data);

                if (data.result == "login") {
                    this.$store.commit("SET_LOGIN", { isLogin: false, userName: "", userProfileImageUrl: "" });
                    this.$router.push("/login");
                } else {
                    let $this = this;
                    this.$alertify.alert("회원가입을 축하합니다. 로그인 페이지로 이동합니다", function () {
                        $this.$router.push("/login");
                    });
                }
            } catch (error) {
                console.log("RegisterVue: error : ");
                console.log(error);
                this.$alertify.error("서버에 문제가 발생했습니다.");
            }
        },
    },
    async created() {
        let params = {
            groupCode: this.groupCode,
        };

        try {
            let { data } = await http.get("/codes", { params }); // params : params shorthand property, Not JSON request
            console.log("RegisterVue: data : ");
            console.log(data);

            this.codeList = data;
        } catch (error) {
            console.log("RegisterVue: error : ");
            console.log(error);
            this.$alertify.error("서버에 문제가 발생했습니다.");
        }
    },
};
</script>

<style>

</style>