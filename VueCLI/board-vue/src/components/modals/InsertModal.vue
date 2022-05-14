<template>
    <div class="modal" id="insertModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">글쓰기</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="titleInsert" class="form-label">제목</label>
                        <input v-model="title" type="text" class="form-control" id="titleInsert" />
                    </div>
                    <div class="mb-3">
                        <label for="contentInsert" class="form-label">내용</label>
                        <div id="divEditorInsert"></div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input v-model="attachFile" class="form-check-input" type="checkbox" value="" id="chkFileUploadInsert" />
                            <label class="form-check-label" for="chkFileUploadInsert">파일 추가</label>
                        </div>
                    </div>
                    <div v-show="attachFile" class="mb-3" style="display: none" id="imgFileUploadInsertWrapper">
                        <input @change="changeFile" type="file" id="inputFileUploadInsert" multiple />
                        <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
                            <img v-for="(file, index) in fileList" :key="index" v-bind:src="file" alt="" />
                        </div>
                    </div>
                    <button @click="boardInsert" class="btn btn-sm btn-primary btn-outline float-end" data-bs-dismiss="modal" type="button">등록</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from 'vue-alertify'
import http from '@/common/axios.js'

Vue.use(CKEditor).use(VueAlertify);

export default {
    data() {
        return {
            title: "",
            CKEditor: "",
            attachFile: false,
            fileList: [],
        };
    },
    methods: {
        changeFile(fileEvent) {
            // 첨부 파일의 목록
            const fileArray = fileEvent.target.files;
            let cnt = fileArray.length;
            for (let i = 0; i < cnt; i++) {
                this.fileList.push(URL.createObjectURL(fileArray[i]));
            }
        },
        async boardInsert() {
            let formData = new FormData();
            formData.append("title", this.title);
            formData.append("content", this.CKEditor.getData());

            let attachFiles = document.querySelector("#inputFileUploadInsert");
            let cnt = attachFiles.files.length;
            for (let i = 0; i < cnt; i++) {
                formData.append("file", attachFiles.files[i]);
            }

            let options = {
                headers: {'Content-type': 'multipart/form-data'}
            }

            try {
                let response = await http.post('/boards', formData, options);
                let { data } = response;
                console.log(data);

                if(data.result == 'login'){
                    this.$router.push("/login");
                } else {
                    this.$alertify.success('글이 등록되었습니다.');
                    this.closeModal();
                }
            } catch (error) {
                console.error(error);
                this.$alertify.error('글 등록 과정에 문제가 생겼습니다.');
            }
        },
        closeModal() {
            this.$emit('call-parent-insert');
        }
    },
    async mounted() {
        try {
            this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorInsert"));
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style scoped>
.modal >>> .ck-editor__editable {
    min-height: 300px !important;
}
/*파일업로드 thumbnail*/
.modal >>> .thumbnail-wrapper {
    margin-top: 5px;
}

.modal >>> .thumbnail-wrapper img {
    width: 100px !important;
    margin-right: 5px;
    max-width: 100%;
}
</style>
