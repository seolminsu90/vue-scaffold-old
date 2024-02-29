
const mixin = {
    methods: {
        navigate(path) {
            this.$router.push(path)
        },
        setCookie(key, value, expiredSecond){
            this.$cookies.set(key, value, expiredSecond) // new Date(2019,03,13).toUTCString() -- 특정 시간 가능
        },
        getCookie(key){
            return this.$cookies.get(key)
        },
        removeCookie(key){
            this.$cookies.remove(key);
        },
        removeAllCookie(){
            this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
        },
        existsCookie(key){
            this.$cookies.isKey('test');
        }
    }
}

export default mixin