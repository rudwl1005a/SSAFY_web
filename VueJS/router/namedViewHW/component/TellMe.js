import router from '../routers.js';

export default {
    template:
    `
    <div class="container mt-3 px=0 py=3">
        <div class="mb-3">
            <label for="name" class="form-label">보내는 사람</label>
            <input type="text" id="name" v-model="writer">
        </div>
        <div id="CKEditor"></div>
        <button @click="sendTellMe" type="button" class="btn btn-primary mt-2">Send</button>
    </div>
    `,
    data() {
        return {
            CKEditor: null,
            writer: '',
        }
    },
    methods: {
        sendTellMe() {
            let message = this.CKEditor.getData();
            let list = [{ from: this.writer, content: message }];
            router.push({ name: 'Mail', params: { list }});
        }
    },
    async mounted() {
        try {
            this.CKEditor = await ClassicEditor.create( document.querySelector( '#CKEditor' ) );
        } catch(error){
            console.error(error);
        }
    }
}