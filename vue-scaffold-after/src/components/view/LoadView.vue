<template>
    <div class="card m-2">
        <div class="card-header">
            Load 관련 모음
        </div>
        <div class="card-body">
            <button type="button" class="btn btn-info" @click="testSpinnerShow = true">Start Load</button>
        </div>
    </div>
    <!-- spinner -->
    <!-- 즉당히 필요한곳에 로드처리 -->
    <div class="spinner dim" style="position:fixed;width:100%;height:100%;top:0;left:0;z-index:30000;cursor:wait"
        v-if="testSpinnerShow" @click="testSpinnerShow = false">
        <div class="spinner-grow text-warning" role="status" style="position:absolute;top:50vh;left:50vw;">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LoadContentScaffold',
    data() {
        return {
            testSpinnerShow: false
        }
    }
}
</script>