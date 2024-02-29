<template>
    <div class="card m-2">
        <div class="card-header">
            Oauth Login test (Kakao)
        </div>
        <!-- 카카오 로그인 구현 -->
        <div class="card-body">
            <h5 class="card-title text-warning">로그인 테스트</h5>
            <a class="p-2" :href="kakaoAuthorize">
                <img src="@/assets/kakao_login_medium_narrow.png"/>
            </a>
            <button type="button" class="btn btn-info m-2" @click="oauthLogin">로그인</button>
            <pre class="card-text"> {{ result }} </pre>
        </div>
    </div>
</template>
<script>
export default {
    name: "OauthLogin",
    computed: {
        kakaoAuthorize(){
            return this.kakao.authorizeUrl +
                '?client_id=' + this.kakao.clientId +
                '&redirect_uri=' + this.kakao.redirectUri +
                '&response_type=' +this.kakao.responseType
        }
    },
    data() {
        return {
            result: '',
            kakao: {
                authorizeUrl: 'https://kauth.kakao.com/oauth/authorize',
                clientId: 'cd6834db1e342873d1cd1a762091551c',
                redirectUri: 'http://localhost:8081/oauth/redirect&response_type=code',
                responseType: 'code'
            }
        }
    },
    methods: {
        oauthLogin(){
            $axios.get('http://localhost:8080/oauth/authserver/authorize') // from backend scaffold
                .then((res) => {
                    this.result = res
                }).catch(e => {
                    console.log(e)
                })
        }
    }
}
</script>