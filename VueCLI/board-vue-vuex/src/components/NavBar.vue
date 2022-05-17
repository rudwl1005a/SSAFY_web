<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a v-show="isLogin" class="navbar-brand" href="#">
                    <img v-bind:src="requireImg" id="imgUserProfileImageUrl" alt="Logo" style="width: 24px; height: 24px; border-radius: 50%" />
                    {{ userInfo.username }}
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link v-show="isLogin" to="/board" class="nav-link">게시판</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-show="isLogin" to="/user" class="nav-link">My Page</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    props: ['isLogin', 'userInfo'],
    computed: {
        requireImg() {
            if(this.userInfo.userProfileImageUrl == undefined){
                return require('../assets/img/noProfile.png');
            } else {
                return require('../assets' + this.userInfo.userProfileImageUrl);
            }
        }
    }
}
</script>

<style>

</style>
