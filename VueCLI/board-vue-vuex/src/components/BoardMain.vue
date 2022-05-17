<template>
    <div class="container mt-3">
        <h4 class="text-center">게시판 - Main</h4>

        <div class="input-group mb-3">
            <input v-model="searchWord" @keydown.enter="boardList" type="text" class="form-control" placeholder="Search" />
            <button @click="boardList" class="btn btn-success" type="button">Search</button>
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일시</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr style="cursor: pointer" v-for="(board, index) in list" :key="index" @click="boardDetail(board.boardId)">
                    <td>{{ board.boardId }}</td>
                    <td>{{ board.title }}</td>
                    <td>{{ board.userName }}</td>
                    <td>{{ board.regDt.date | makeDateStr(".") }}</td>
                    <td>{{ board.readCount }}</td>
                </tr>
            </tbody>
        </table>

        <pagination 
            :listRowCount="listRowCount" 
            :pageLinkCount="pageLinkCount" 
            :currentPageIndex="currentPageIndex" 
            :totalListItemCount="totalListItemCount" 
            v-on:call-parent-move-page="movePage"> 
        </pagination>

        <button class="btn btn-sm btn-primary" @click="showInsertModal">글쓰기</button>

        <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
        <detail-modal 
            v-bind:board="board" 
            v-on:call-parent-change-to-update="changeToUpdate" 
            v-on:call-parent-change-to-delete="changeToDelete"> 
        </detail-modal>
        <update-modal v-bind:board="board" v-on:call-parent-update="closeAfterUpdate"></update-modal>
    </div>
</template>

<script>
import http from '@/common/axios.js'
import Pagination from '@/components/Pagination.vue'
import InsertModal from '@/components/modals/InsertModal.vue'
import DetailModal from '@/components/modals/DetailModal.vue'
import UpdateModal from '@/components/modals/UpdateModal.vue'
import util from '@/common/util.js'

import { Modal } from 'bootstrap'

export default {
    components: { Pagination, InsertModal, DetailModal, UpdateModal },
    data() {
        return {
            // modal
            insertModal: null,
            detailModal: null,
            updateModal: null,

            // list
            list: [],
            limit: 10,
            offset: 0,
            searchWord: '',

            // pagination
            listRowCount: 10,
            pageLinkCount: 10,
            currentPageIndex: 1,
            totalListItemCount: 0,

            // 게시글 한개
            board: {
                boardId: 0,
                title: '',
                content: '',
                userName: '',
                regDate: '',
                regTime: '',
                readCount: 0,
                fileList: [],
                sameUser: false
            }
        }
    },
    methods: {
        async boardList() {
            let params = {
                limit: this.limit,
                offset: this.offset,
                searchWord: this.searchWord,
            }
            try {
                let response = await http.get('/boards', { params }); // params: params -> shorthand property
                let { data } = response;
                console.log(data);

                if(data.result == 'login'){
                    this.$router.push("/login");
                } else {
                    this.list = data.list;
                    this.totalListItemCount = data.count;
                }
            } catch (error) {
                console.error(error);
            }
        },
        movePage(pageIndex) {
            this.offset = (pageIndex - 1) * this.listRowCount;
            this.currentPageIndex = pageIndex;
            this.boardList();
        },
        showInsertModal() {
            this.insertModal.show();
        },
        closeAfterInsert() {
            this.insertModal.hide();
            this.boardList();
        },
        async boardDetail(boardId) {
            try {
                let response = await http.get('/boards/' + boardId);
                let { data } = response;
                console.log(data);

                if (data.result == 'login'){
                    this.$router.push("/login");
                } else {
                    // updateModal의 watch 호출 안됨 -> property만 바뀌기 때문에
                    // let { dto } = data;
                    // this.board.boardId = dto.boardId;
                    // this.board.title = dto.title;
                    // this.board.content= dto.content;
                    // this.board.userName= dto.userName;
                    // this.board.readCount = dto.readCount;
                    // this.board.fileList = dto.fileList;
                    // this.board.sameUser = dto.sameUser;

                    // let { regDt } = dto;
                    // this.board.regDate= util.makeDateStr(regDt.date.year, regDt.date.month, regDt.date.day, '.');
                    // this.board.regTime= util.makeTimeStr(regDt.time.hour, regDt.time.minute, regDt.time.second, ':');

                    let { regDt } = data.dto; // destructuring
                    let boardNew = {
                        regDate: util.makeDateStr(regDt.date.year, regDt.date.month, regDt.date.day, '.'),
                        regTime: util.makeTimeStr(regDt.time.hour, regDt.time.minute, regDt.time.second, ':'),
                        ...data.dto
                    }; // 3dot spread operator

                    this.board = boardNew; // watch 호출

                    this.detailModal.show();
                }
            } catch(error) {
                console.error(error);
            }
        },
        changeToUpdate(){
            this.detailModal.hide();
            this.updateModal.show();
        },
        closeAfterUpdate() {
            this.updateModal.hide();
            this.boardList();
        },
        changeToDelete(){
            this.detailModal.hide();

            var $this = this; // alertify.confirm-function()에서 this 는 alertify 객체
            this.$alertify.confirmWithTitle(
                '삭제 확인',
                '이 글을 삭제하시겠습니까?',
                function(){
                    $this.boardDelete(); // $this 사용
                },
                function(){
                    console.log('cancel');
                }
            );
        },
        async boardDelete() {
            try {
                let response = await http.delete('/boards/' + this.board.boardId);
                let { data } = response;
                console.log(data);

                if(data.result == 'login'){
                    this.$router.push("/login");
                } else {
                    this.$alertify.success('글이 삭제되었습니다.');
                    this.boardList();
                }
            } catch (error) {
                console.error(error);
                this.$alertify.error('글 삭제 과정에 문제가 생겼습니다.');
            }
        }
    },
    created() {
        this.boardList();
    },
    mounted() {
        this.insertModal = new Modal(document.querySelector('#insertModal'));
        this.detailModal = new Modal(document.querySelector('#detailModal'));
        this.updateModal = new Modal(document.querySelector('#updateModal'));
    },
    filters: {
        makeDateStr(date, separator) {
		    return date.year + separator + ( (date.month < 10) ? '0' + date.month : date.month ) + separator + ( (date.day < 10) ? '0' + date.day : date.day );
        }
    }
}
</script>

<style>

</style>
