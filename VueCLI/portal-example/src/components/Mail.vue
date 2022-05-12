<template>
    <div class="container mt-3 px=0 py=3">
        <div class="card">
            <img src="https://picsum.photos/1024/400/?image=25" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Mail</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button @click="checkMail" class="btn btn-primary">Check Mail</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            from: this.$route.query.from,
            content: this.$route.query.content
        }
    },
    methods: {
        checkMail() {
            if(this.from != undefined){
                alert(this.from + " / " + this.content);
            } else {
                alert("메일이 없습니다.");
            }
        }
    }
}
</script>

<style>

</style>