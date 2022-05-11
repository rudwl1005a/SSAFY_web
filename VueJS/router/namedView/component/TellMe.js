export default {
    template:
    `
    <div class="container mt-3 px=0 py=3">
        <div id="CKEditor"></div>
        <button @click="sendTellMe" type="button" class="btn btn-primary mt-2">Send</button>
    </div>
    `,
    data() {
        return {
            CKEditor: null,
        }
    },
    methods: {
        sendTellMe() {
            let message = this.CKEditor.getData();
            alert(message);
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