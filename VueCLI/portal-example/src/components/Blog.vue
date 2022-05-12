<template>
  <div class="container mt-3 px=0 py=3">
        <div class="card">
            <img :src="imgSrcUrl" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Blog</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // imgSrcUrl: "https://picsum.photos/1024/400/?image=39",
            imgSrcUrl: require("../assets/logo.png"), // require를 사용하여 이미지 찾기
        }
    }
}
</script>

<style>

</style>