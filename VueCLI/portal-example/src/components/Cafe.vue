<template>
  <div class="container mt-3 px=0 py=3">
        <div class="card">
            <img src="https://picsum.photos/1024/400/?image=41" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Cafe</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button @click="sendMail" class="btn btn-primary">Send Mail</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/routers/routers.js"

export default {
    methods: {
        sendMail() {
            let data = {
                from: 'hong@gildong.com',
                content: '안녕하세요, 홍길동입니다......'
            };

            // 라우터를 이용해서 데이터와 함께 이동
            // this.$router.push({ path: '/mail', query: data })
            // this.$router.push({ name: 'Mail', query: data }) // 이름으로도 가능
            router.push({ name: 'Mail', query: data }) // router import해서도 가능
        }
    }
}
</script>

<style>

</style>