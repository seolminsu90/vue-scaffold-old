<template>
    <nav class="text-center position-relative">
        <p class="pagination-count">Total Count {{totalCnt}}</p>
        <div>
            <ul class="pagination justify-content-center"> <!-- 끝은 justify-content-end -->
                <li class="page-item" :class="{disabled :mPrevGroup}" @click="pageMove('first')"><span class="page-link"><i class="fa-solid fa-angles-left"></i></span></li>
                <li class="page-item" :class="{disabled :mPrevGroup}" @click="prevPageMove"><span class="page-link"><i class="fa-solid fa-angle-left"></i></span> </li>

                <template v-for="pgno in mPageGroupSize">
                    <li @click="selectPageMove(pgno + mStart)" :class="{ active: (pgno + mStart == mPage) }" class="page-item"
                        v-if="(pgno + mStart) <= mTotalPage" :key="pgno"><span class="page-link">{{ (pgno + mStart) }}</span></li>
                </template>

                <li class="page-item" :class="{disabled :mNextGroup}" @click="nextPageMove"><span class="page-link"><i class="fa-solid fa-angle-right"></i></span> </li>
                <li class="page-item" :class="{disabled :mNextGroup}" @click="pageMove('last')"><span class="page-link"><i class="fa-solid fa-angles-right"></i></span> </li>
            </ul>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'PaginationPart',
    props: {
        totalCnt: {
            type: Number
        },
        page: {
            type: Number
        },
        pageGroupSize: {
            type: Number
        },
        articleSize: {
            type: Number
        },
        pageMoveEventFunc: {
            type: Function
        }
    },
    watch: {
        totalCnt: function () { this.pagination() },
        articleSize: function () { this.pagination() },
        page: function () { this.pagination() }
    },
    created() {
        this.pagination()
    },
    data() {
        return {
            mPrevGroup: false,
            mNextGroup: false,
            mTotalCnt: null,
            mArticleSize: null,
            mPage: null,
            mTotalPage: null,
            mPageGroupSize: (this.pageGroupSize == undefined) ? 5 : this.pageGroupSize,
            mNowPageGroup: null,
            mStart: null,
            mEnd: null
        }
    },
    methods: {
        pagination() {
            this.mTotalCnt = this.totalCnt
            this.mArticleSize = this.articleSize
            this.mPage = this.page
            this.mTotalPage = Math.ceil(this.mTotalCnt / this.mArticleSize)
            this.mNowPageGroup = Math.ceil(this.mPage / this.mPageGroupSize)
            this.mStart = (this.mNowPageGroup - 1) * this.mPageGroupSize
            this.mEnd = this.mStart + this.mPageGroupSize
            this.mPrevGroup = (this.mNowPageGroup <= 1)
            this.mNextGroup = (this.mNowPageGroup >= Math.ceil(this.mTotalPage / this.mPageGroupSize))
        },
        prevPageMove() {
            if(this.mPrevGroup) return;
            this.mNowPageGroup = this.mNowPageGroup - 1
            this.mPage = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        },
        nextPageMove() {
            if(this.mNextGroup) return;
            this.mNowPageGroup = this.mNowPageGroup + 1
            this.mPage = (this.mNowPageGroup - 1) * this.mPageGroupSize + 1
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        },
        pageMove(type) {
            if (type == 'first') {
                this.mPage = 1
            } else if (type == 'last') {
                this.mPage = this.mTotalPage
            }
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        },
        selectPageMove(page) {
            this.mPage = page
            this.pageMoveEventFunc(this.mPage)
            this.pagination()
        }
    }
}
</script>

<style scoped>
.pagination-count {
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 0.7rem;
    font-weight: 600;
    color: rgb(68, 57, 57)
}

.page-item {
    cursor: pointer;
}

.page-item span {
    border: none !important;
    border-radius: 100%;
    font-weight: bold;
}

.pagination li>span:focus,
.pagination li>span:hover {
    color: #5a5a5a;
    background-color: #eee;
    border-color: #ddd;
}

.pagination .active>span {
    color: white !Important;
    background-color: #5A4181 !Important;
}

.pagination .active>span:hover {
    background-color: #5A4181 !Important;
}
</style>