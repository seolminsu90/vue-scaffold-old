<template>
  <div class="card m-2">
    <div class="card-header">알림 (팝업, 토스트 등) 처리</div>

    <div class="card-body">
      <h5 class="card-title text-warning">모달</h5>
      <button type="button" @click="showPopup" class="btn btn-info">모달 예시</button>
      <hr/>
      <h5 class="card-title text-warning">토스트</h5>
      <button type="button" @click="showToast" class="btn btn-info">토스트 예시</button>
    </div>

    <PopUp ref="myPopup">
        
    </PopUp>
  </div>
</template>
<script>
import PopUp from '../PopUp.vue';
export default {
    name: "NotificationView",
    mounted() { },
    methods: {
        showPopup() {
            this.$refs.myPopup.show()
        },
        showToast() {
            $util.toast("success", "Hello world !!");
        }
    },
    components: { PopUp }
};
</script>
