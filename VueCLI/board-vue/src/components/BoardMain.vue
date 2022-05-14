<template>
    <div class="container mt-3">
        <h4 class="text-center">게시판 - Main</h4>       
    
        <div class="input-group mb-3">
        <input v-model="searchWord" @keydown.enter="boardList" type="text" class="form-control" placeholder="Search">
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
                <tr style="cursor:pointer" v-for="(board, index) in list" :key="index">
                    <td>{{ board.boardId }}</td>
                    <td>{{ board.title }}</td>
                    <td>{{ board.userName }}</td>
                    <td>{{ board.regDt.date | makeDateStr('.') }}</td>
                    <td>{{ board.readCount }}</td>
                </tr>
            </tbody>
        </table>
    
        <pagination
            :listRowCount="listRowCount"
            :pageLinkCount="pageLinkCount"
            :currentPageIndex="currentPageIndex"
            :totalListItemCount="totalListItemCount"
            v-on:call-parent-move-page="movePage" >
        </pagination>

        <button class="btn btn-sm btn-primary" @click="showInsertModal">글쓰기</button>

        <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
    </div>
</template>

<script>
import http from '@/common/axios.js'
import Pagination from '@/components/Pagination.vue'
import InsertModal from '@/components/modals/InsertModal.vue'

import { Modal } from 'bootstrap'

export default {
    components: { Pagination, InsertModal },
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
        }
    },
    created() {
        this.boardList();
    },
    mounted() {
        this.insertModal = new Modal(document.querySelector('#insertModal'));
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