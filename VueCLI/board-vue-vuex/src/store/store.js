import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import http from "@/common/axios.js";
import util from "@/common/util.js";

import router from "@/routers/routers.js";

export default new Vuex.Store({
    state: {
        // login, NavBar
        login: {
            // NavBar
            isLogin: false,

            userName: "",
            userProfileImageUrl: "",

            // Login
            userEmail: "hong@gildong.com",
            userPassword: "1234",
        },
        //
        board: {
            // list
            list: [],
            limit: 10,
            offset: 0,
            searchWord: "",

            // pagination
            listRowCount: 10,
            pageLinkCount: 10,
            currentPageIndex: 1,

            totalListItemCount: 0,

            // detail, update, delete

            boardId: 0,
            title: "",
            content: "",
            userName: "",
            regDate: "",
            regTime: "",
            readCount: 0,
            fileList: [],
            sameUser: false,
        },
    },
    // state 상태를 변경하는 유일한 방법
    mutations: {
        SET_LOGIN(state, payload) {
            state.login.isLogin = payload.isLogin;
            state.login.userName = payload.userName;
            state.login.userProfileImageUrl = payload.userProfileImageUrl;
        },

        SET_BOARD_LIST(state, list) {
            state.board.list = list;
        },

        SET_BOARD_TOTAL_LIST_ITEM_COUNT(state, count) {
            state.board.totalListItemCount = count;
        },

        SET_BOARD_MOVE_PAGE(state, pageIndex) {
            state.board.offset = (pageIndex - 1) * state.board.listRowCount;
            state.board.currentPageIndex = pageIndex;
        },

        SET_BOARD_DETAIL(state, payload) {
            state.board.boardId = payload.boardId;
            state.board.title = payload.title;
            state.board.content = payload.content;
            state.board.userName = payload.userName;
            state.board.regDate = util.makeDateStr(payload.regDt.date.year, payload.regDt.date.month, payload.regDt.date.day, ".");
            state.board.regTime = util.makeTimeStr(payload.regDt.time.hour, payload.regDt.time.minute, payload.regDt.time.second, ":");
            state.board.readCount = payload.readCount;
            state.board.fileList = payload.fileList;
            state.board.sameUser = payload.sameUser;
        },
        // for UpdateModal title v-modal
        SET_BOARD_TITLE(state, title) {
            state.board.title = title;
        },
    },
    // for async method
    actions: {
        async boardList(context) {
            let params = {
                limit: this.state.board.limit,
                offset: this.state.board.offset,
                searchWord: this.state.board.searchWord,
            };

            try {
                let { data } = await http.get("/boards", { params }); // params: params shorthand property, let response 도 제거
                console.log("BoardMainVue: data : ");
                console.log(data);
                if (data.result == "login") {
                    router.push("/login");
                } else {
                    context.commit("SET_BOARD_LIST", data.list);
                    context.commit("SET_BOARD_TOTAL_LIST_ITEM_COUNT", data.count);
                }
            } catch (error) {
                console.error(error);
            }

        },
    },
    getters: {
        isLogin: function (state) {
            return state.login.isLogin;
        },

        getBoardList: function (state) {
            return state.board.list;
        },

        // pagination
        getPageCount: function (state) {
            return Math.ceil(state.board.totalListItemCount / state.board.listRowCount);
        },
        getStartPageIndex: function (state) {
            if (state.board.currentPageIndex % state.board.pageLinkCount == 0) {
                //10, 20...맨마지막
                return (state.board.currentPageIndex / state.board.pageLinkCount - 1) * state.board.pageLinkCount + 1;
            } else {
                return Math.floor(state.board.currentPageIndex / state.board.pageLinkCount) * state.board.pageLinkCount + 1;
            }
        },
        getEndPageIndex: function (state, getters) {
            let ret = 0;
            if (state.board.currentPageIndex % state.board.pageLinkCount == 0) {
                //10, 20...맨마지막
                ret = (state.board.currentPageIndex / state.board.pageLinkCount - 1) * state.board.pageLinkCount + state.board.pageLinkCount;
            } else {
                ret = Math.floor(state.board.currentPageIndex / state.board.pageLinkCount) * state.board.pageLinkCount + state.board.pageLinkCount;
            }
            // 위 오류나는 코드를 아래와 같이 비교해서 처리
            return ret > getters.getPageCount ? getters.getPageCount : ret;
        },
        getPrev: function (state) {
            if (state.board.currentPageIndex <= state.board.pageLinkCount) {
                return false;
            } else {
                return true;
            }
        },
        getNext: function (state, getters) {
            if (Math.floor(getters.getPageCount / state.board.pageLinkCount) * state.board.pageLinkCount < state.board.currentPageIndex) {
                return false;
            } else {
                return true;
            }
        },
    },
});