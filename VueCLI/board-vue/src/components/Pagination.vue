<template>
    <div>
        <nav aria-label="...">
            <ul class="pagination justify-content-center">
                <li v-if="prev" class="page-item">
                    <a class="page-link" @click="paginationChanged(startPageIndex - 1)">Prev</a>
                </li>

                <li v-for="index in (endPageIndex - startPageIndex + 1)" :key="index" 
                    v-bind:class="{ active: (startPageIndex + index - 1 == currentPageIndex) }" class="page-item">
                    <a class="page-link" @click="paginationChanged(startPageIndex + index - 1)">{{ startPageIndex + index - 1 }}</a>
                </li>
                
                <li v-if="next" class="page-item">
                    <a class="page-link" @click="paginationChanged(endPageIndex + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: ["listRowCount", "pageLinkCount", "currentPageIndex", "totalListItemCount"],
    computed: {
        pageCount() {
            return Math.ceil(this.totalListItemCount / this.listRowCount);
        },
        startPageIndex() {
            if (this.currentPageIndex % this.pageLinkCount == 0) {
                //10, 20...맨마지막
                return (this.currentPageIndex / this.pageLinkCount - 1) * this.pageLinkCount + 1;
            } else {
                return Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + 1;
            }
        },
        endPageIndex() {
            // 아래 코드는 Error in render: "RangeError: Maximum call stack size exceeded" 발생,
            // this.endPageIndex 계산 할 때, 자기 자신 값을 단순 비교만하더라도 에러 발생
            // if( this.endPageIndex < this.pageCount ) return this.pageCount;

            let ret = 0;
            if (this.currentPageIndex % this.pageLinkCount == 0) {
                //10, 20...맨마지막
                ret = (this.currentPageIndex / this.pageLinkCount - 1) * this.pageLinkCount + this.pageLinkCount;
            } else {
                ret = Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + this.pageLinkCount;
            }
            // 위 오류나는 코드를 아래와 같이 비교해서 처리
            return ret > this.pageCount ? this.pageCount : ret;
        },
        prev() {
            if (this.currentPageIndex <= this.pageLinkCount) {
                return false;
            } else {
                return true;
            }
        },
        next() {
            if (Math.floor(Math.ceil(this.totalListItemCount / this.listRowCount) / this.pageLinkCount) * this.pageLinkCount < this.currentPageIndex) {
                return false;
            } else {
                return true;
            }
        },
    },
    methods: {
        paginationChanged(pageIndex) {
            this.$emit('call-parent-move-page', pageIndex);
        }
    }
};
</script>

<style>

</style>
