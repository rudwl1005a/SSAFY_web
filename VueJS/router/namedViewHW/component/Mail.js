export default {
    template:
    `
    <div class="container mt-3 px=0 py=3">
        <div class="card">
            <img src="https://picsum.photos/1024/400/?image=25" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Mail</h5>
                <p class="card-text">확인하지 않은 메일 : {{ count }} 개</p>
                <button @click="checkMail" class="btn btn-primary">Check Mail</button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            mailList: undefined,
            count: 0,
        }
    },
    methods: {
        checkMail() {
            if(this.mailList != undefined){
                this.mailList.forEach( el => {
                    alert("보낸 사람: " + el.from + "\n" + "보낸 내용: " + el.content);
                })
                this.mailList = undefined;
                this.count = 0;
            } else {
                alert("확인하지 않은 메일이 없습니다.");
            }
        }
    },
    created() {
        if(this.$route.params.list != undefined){
            this.mailList = this.$route.params.list;
            this.count = this.$route.params.list.length;
        }
    }
}