import router from '../routers.js';

export default {
    template:
    `
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
    `,
    methods: {
        sendMail() {
            let list = [
                { from: '1@gildong.com', content: '안녕하세요1, 일길동입니다......' },
                { from: '2@gildong.com', content: '안녕하세요2, 이길동입니다......' },
                { from: '3@gildong.com', content: '안녕하세요3, 삼길동입니다......' },
                { from: '4@gildong.com', content: '안녕하세요4, 사길동입니다......' },
            ];

            router.push({ name: 'Mail', params: { list }})
        }
    }
}