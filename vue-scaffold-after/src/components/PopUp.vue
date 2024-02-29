<!-- Popup html wrapper -->
<template>
    <transition name="popup-animate" appear>
        <div v-if="visible" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
                    </div>
                    <div class="modal-body">
                        <slot>
                            <!-- Popup body -->
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <button v-if="ok3 !== undefined" type="button" class="btn btn-danger" @click="okFunc3">{{ ok3Title }}</button>
                        <button v-if="ok2 !== undefined" type="button" class="btn btn-info" @click="okFunc2">{{ ok2Title }}</button>
                        <button v-if="ok !== undefined" type="button" class="btn btn-primary" @click="okFunc">{{ okTitle }}</button>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="close">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <transition name="fade">
      <div class="dim" v-if="visible"></div>
    </transition>
</template>

<script>

export default {
    name: 'PopUp',
    props: {
        ok: {
            type: Function
        },
        okTitle: {
            type: String,
            default: '확인'
        },
        ok2: {
            type: Function,
            required: false
        },
        ok2Title: {
            type: String,
            default: '확인'
        },
        ok3: {
            type: Function,
            required: false
        },
        ok3Title: {
            type: String,
            default: '확인'
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        show() { this.visible = true },
        close() { this.visible = false },
        okFunc() { 
            this.ok(this.close) // close callback
        },
        okFunc2() { 
            this.ok2(this.close) // close callback
        },
        okFunc3() { 
            this.ok3(this.close) // close callback
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.modal {
  display: block;
  padding-top: 5rem;
}
.dim{
  position:fixed; top:0; left:0;
  width:100%; height:100%;
  background: rgba(0, 0, 0, .3);
}

.popup-animate-enter-active {
  transition: all 0.3s ease-out;
}

.popup-animate-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.popup-animate-enter-from,
.popup-animate-leave-to {
  transform: translateY(-3rem);
  opacity: 0;
}
</style>
