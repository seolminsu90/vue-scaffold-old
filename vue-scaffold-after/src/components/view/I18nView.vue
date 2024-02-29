<template>
  <div class="card m-2">
    <div class="card-header">클라이언트 Localization</div>
    <div class="card-body">
      <h5 class="card-title text-warning">
        클릭 시 /common/i18n에 정의된 값에 의해 텍스트가 바뀐다.
      </h5>
      <button type="button" class="btn btn-info" @click="toggleLocale">
        {{ $t("button.add") }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "I10nView",
  methods: {
    toggleLocale() {
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "ko";
      } else {
        this.$i18n.locale = "en";
      }
    },
  },
};
</script>
