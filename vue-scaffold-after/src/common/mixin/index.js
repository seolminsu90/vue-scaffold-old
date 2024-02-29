
import { mapActions, mapGetters } from 'vuex'

export const commonMixin = {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters({
            GetRequestCount: 'GetRequestCount',
            GetAuth: 'authStore/GetAuth'
        }),
    },
    methods: {
        ...mapActions({
            SetAuth: 'authStore/SetAuth'
        }),
    }
}

export const otherMixin = {
}