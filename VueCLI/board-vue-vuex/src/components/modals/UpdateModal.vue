<template>
    <div class="modal fade" id="updateModal">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title">글수정</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				
				<!-- Modal Body -->
				<div class="modal-body">
					<div class="mb-3">
						<label for="titleUpdate" class="form-label">제목</label>
						<input v-model="title" type="text" class="form-control" id="titleUpdate">
					</div>
					<div class="mb-3">
						<div id=divEditorUpdate></div>
					</div>
					<div class="mb-3">
						첨부파일 : <span v-for="(file, index) in board.fileList" :key="index">{{ file.fileName }} </span>
					</div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input v-model="attachFile" class="form-check-input" type="checkbox" value="" id="chkFileUploadUpdate" />
                            <label class="form-check-label" for="chkFileUploadUpdate">파일 변경</label>
                        </div>
                    </div>
                    <div v-show="attachFile" class="mb-3" style="display: none" id="imgFileUploadUpdateWrapper">
                        <input @change="changeFile" type="file" id="inputFileUploadUpdate" multiple />
                        <div id="imgFileUploadUpdateThumbnail" class="thumbnail-wrapper">
                            <img v-for="(file, index) in fileList" :key="index" v-bind:src="file" alt="" />
                        </div>
                    </div>
                    <button @click="boardUpdate" class="btn btn-sm btn-primary btn-outline float-end" data-bs-dismiss="modal" type="button">수정</button>
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
    props: ["board"],
    data() {
        return {
            boardId: '',
            title: '',
            CKEditor: '',
            attachFile: false,
            fileList: [],
        };
    },
    methods: {
        changeFile(fileEvent) {
            this.fileList = [];
            const fileArray = Array.from(fileEvent.target.files);
            fileArray.forEach(file => this.fileList.push(URL.createObjectURL(file)));
        },
        async boardUpdate() {
            let formData = new FormData();
            formData.append("boardId", this.boardId);
            formData.append("title", this.title);
            formData.append("content", this.CKEditor.getData());

            let attachFiles = document.querySelector("#inputFileUploadUpdate").files;
            if (attachFiles.length > 0) {
                const fileArray  = Array.from(attachFiles);
                fileArray.forEach(file => formData.append("file", file));
            }

            let options = {
                headers: {'Content-type': 'multipart/form-data'}
            }

            try {
                // file upload는 put을 지원하지 않는다 -> 그래서 post
                let response = await http.post('/boards/' + this.board.boardId, formData, options);
                let { data } = response;
                console.log(data);

                if(data.result == 'login'){
                    this.$router.push("/login");
                } else {
                    this.$alertify.success('글이 수정되었습니다.');
                    this.closeModal();
                }
            } catch (error) {
                console.error(error);
                this.$alertify.error('글 수정 과정에 문제가 생겼습니다.');
            }
        },
        closeModal() {
            this.$emit('call-parent-update');
        }
    },
    async mounted() {
        try {
            this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorUpdate"));
        } catch (error) {
            console.error(error);
        }

    },
    watch: {
        board : function(){
            // props --> data
            this.boardId = this.board.boardId;
            this.title = this.board.title;
            this.CKEditor.setData( this.board.content );

            // 첨부 파일 관련 초기화
            // 수정 또는 수정 전 첨부 파일을 선택하면 그대로 남아 있다.
            this.attachFile = false;
            this.fileList = [];
            document.querySelector("#inputFileUploadUpdate").value = '';
        }
    }
}
</script>

<style scoped>
.modal >>> .ck-editor__editable {
    min-height: 300px !important;
}
.modal >>> .thumbnail-wrapper {
    margin-top: 5px;
}

.modal >>> .thumbnail-wrapper img {
    width: 100px !important;
    margin-right: 5px;
    max-width: 100%;
}
</style>