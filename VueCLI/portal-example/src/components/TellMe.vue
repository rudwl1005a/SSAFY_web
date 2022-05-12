<template>
    <div class="container mt-3 px=0 py=3">
        <div id="CKEditor"></div>
        <button @click="sendTellMe" type="button" class="btn btn-primary mt-2">Send</button>
    </div>
</template>

<script>
import Vue from "vue"
import CKEditor from "@ckeditor/ckeditor5-vue2"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

Vue.use(CKEditor);

export default {
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
</script>

<style scoped>
/* scoped를 사용할 때 서드파티 같은 경우는 적용이 안될 때가 있다. 이 때 '부모 요소' >>> (deep selector) 를 사용하면 적용 된다 */
.container >>> .ck-editor__editable {
    width: 100%;
    height: 200px;
    overflow-y: scroll;
}
</style>