<template>
    <div class="container">
        <h4 class="text-center">게시판 - Main</h4>

        <div class="input-group mb-3">
            <!-- store 사용 -->
            <!-- <input v-model="searchWord" @keydown.enter="boardList" type="text" class="form-control"> -->
            <input v-model="$store.state.board.searchWord" @keydown.enter="boardList" type="text" class="form-control" />
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
                <!-- store 사용 -->

                <!-- 직접 store 에 접근해도 된다. -->
                <!-- <tr v-for="(board, index) in $store.state.board.list" @click="boardDetail(board.boardId)" v-bind:key="index"> -->

                <!-- getters 를 이용하는 코드 -->
                <!-- computed - listGetters - getBoardList  -->
                <tr style="cursor: pointer" v-for="(board, index) in listGetters" @click="boardDetail(board.boardId)" v-bind:key="index">
                    <td>{{ board.boardId }}</td>
                    <td>{{ board.title }}</td>
                    <td>{{ board.userName }}</td>
                    <td>{{ board.regDt.date | makeDateStr(".") }}</td>
                    <td>{{ board.readCount }}</td>
                </tr>
            </tbody>
        </table>

        <!-- props 사용 X -->
        <!-- 
        <pagination 
            v-bind:listRowCount="listRowCount"
            v-bind:pageLinkCount="pageLinkCount"
            v-bind:currentPageIndex="currentPageIndex"
            v-bind:totalListItemCount="totalListItemCount"
            v-on:call-parent="movePage">
        </pagination>
        -->
        <pagination v-on:call-parent="movePage"></pagination>

        <button class="btn btn-sm btn-primary" @click="showInsertModal">글쓰기</button>

        <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
        <!-- props 제거 -->
        <detail-modal v-on:call-parent-change-to-update="changeToUpdate" v-on:call-parent-change-to-delete="changeToDelete"></detail-modal>
        <update-modal v-on:call-parent-update="closeAfterUpdate"></update-modal>
    </div>
</template>

<script>
import InsertModal from "./modals/InsertModal.vue";
import DetailModal from "./modals/DetailModal.vue";
import UpdateModal from "./modals/UpdateModal.vue";

import { Modal } from "bootstrap";

import http from "@/common/axios.js";
import util from "@/common/util.js";

import Pagination from "./Pagination.vue";

// 삭제
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
    name: "BoardMain",
    components: { InsertModal, DetailModal, UpdateModal, Pagination },
    data() {
        return {
            // modal
            insertModal: null,
            detailModal: null,
            updateModal: null,

            // 아래 data 사용 X
            // // list
            // list: [],
            // limit: 10,
            // offset: 0,
            // searchWord: '',

            // // pagination
            // listRowCount: 10,
            // pageLinkCount: 10,
            // currentPageIndex: 1,

            // totalListItemCount: 0,

            // // detail
            // boardId: 0,

            // // update
            // board: {
            //   boardId: 0,
            //   title: '',
            //   content: '',
            //   fileList: []
            // }
        };
    },
    computed: {
        // gttters 이용
        listGetters() {
            return this.$store.getters.getBoardList; // no getBoardList()
        },
    },
    methods: {
        // list
        // store actions 에 구현
        // 가능한 한 가지 방법
        boardList() {
            this.$store.dispatch("boardList");
        },

        // pagination
        movePage(pageIndex) {
            console.log("BoardMainVue : movePage : pageIndex : " + pageIndex);

            // store commit 으로 변경
            // this.offset = (pageIndex - 1) * this.listRowCount;
            // this.currentPageIndex = pageIndex;
            this.$store.commit("SET_BOARD_MOVE_PAGE", pageIndex);

            this.boardList();
        },

        // util
        makeDateStr: util.makeDateStr,

        // insert
        showInsertModal() {
            this.insertModal.show();
        },

        closeAfterInsert() {
            this.insertModal.hide();
            this.boardList();
        },

        // detail
        async boardDetail(boardId) {
            // store 변경
            // this.boardId = boardId;
            // this.$store.commit('mutateSetBoardBoardId', boardId);

            try {
                let { data } = await http.get("/boards/" + boardId);
                console.log(data);

                if (data.result == "login") {
                    this.doLogout(); // this.$router.push("/login"); 에서 변경
                } else {
                    let { dto } = data;
                    this.$store.commit("SET_BOARD_DETAIL", dto);

                    this.detailModal.show();
                }
            } catch (error) {
                console.log("BoardMainVue: error : ");
                console.log(error);
            }
            // http.get(
            // '/boards/' + boardId, // props variable
            // )
            // .then(({ data }) => {
            //   console.log("DetailModalVue: data : ");
            //   console.log(data);

            //   if( data.result == 'login' ){
            //     this.doLogout();
            //   }else{
            //     this.$store.commit(
            //       'SET_BOARD_DETAIL',
            //       {
            //         boardId: data.dto.boardId,
            //         title: data.dto.title,
            //         content: data.dto.content,
            //         userName: data.dto.userName,
            //         regDt: this.makeDateStr(data.dto.regDt.date.year, data.dto.regDt.date.month, data.dto.regDt.date.day, '.'),
            //         fileList: data.dto.fileList,
            //         sameUser: data.dto.sameUser, // not data.dto.sameUser
            //       }
            //     );

            //     this.detailModal.show();
            //   }
            // })
            // .catch((error) => {
            //   console.log("DetailModalVue: error ");
            //   console.log(error);
            // });
        },

        // update
        // Detail 에서 board data 를 직접 변경
        // changeToUpdate( board ){
        //   this.board = board;
        //   this.detailModal.hide();
        //   this.updateModal.show();
        // },
        changeToUpdate() {
            // board parameter 필요 없음.
            // data update 사용 X
            // this.board = board;
            this.detailModal.hide();
            this.updateModal.show();
        },

        closeAfterUpdate() {
            this.updateModal.hide();
            this.boardList();
        },

        // delete
        // $emit board 사용 X
        // changeToDelete(board){
        changeToDelete() {
            this.detailModal.hide();

            var $this = this; // alertify.confirm-function()에서 this 는 alertify 객체
            this.$alertify.confirmWithTitle(
                "삭제 확인",
                "이 글을 삭제하시겠습니까?",
                function () {
                    // board.boardId 사용 X
                    $this.boardDelete(); // $this 사용
                },
                function () {
                    console.log("cancel");
                }
            );
        },
        async boardDelete() {
            // parameter 사용 X

            try {
                let { data } = await http.delete("/boards/" + this.$store.state.board.boardId);
                console.log(data);

                if (data.result == "login") {
                    this.doLogout();
                } else {
                    this.$alertify.success("글이 삭제되었습니다.");
                    this.boardList();
                }
            } catch (error) {
                console.log("BoardMainVue: error : ");
                console.log(error);
            }

            // http.delete(
            //   "/boards/" + this.$store.state.board.boardId
            //   )
            //   .then(({ data }) => {
            //     console.log("BoardMainVue: data : ");
            //     console.log(data);
            //     if( data.result == 'login' ){
            //       this.doLogout();
            //     }else{
            //       this.boardList();
            //     }
            //   })
            //   .catch( error => {
            //       console.log(error)
            //   });
        },
        // logout 처리 별도 method
        doLogout() {
            this.$store.commit("SET_LOGIN", { isLogin: false, userName: "", userProfileImageUrl: "" });
            this.$router.push("/login");
        },
    },
    created() {
        this.boardList();
    },
    mounted() {
        this.insertModal = new Modal(document.getElementById("insertModal"));
        this.detailModal = new Modal(document.getElementById("detailModal"));
        this.updateModal = new Modal(document.getElementById("updateModal"));
    },
    filters: {
        makeDateStr: function (date, separator) {
            return date.year + separator + (date.month < 10 ? "0" + date.month : date.month) + separator + (date.day < 10 ? "0" + date.day : date.day);
        },
    },
};
</script>

<style scoped>

</style>
