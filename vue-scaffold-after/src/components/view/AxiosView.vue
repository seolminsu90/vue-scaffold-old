<template>
    <div class="card m-2">
        <div class="card-header">
            Axios Example 및 Long -> String 처리 확인 (json-bigint)
        </div>

        <div class="card-body">
            <h5 class="card-title text-warning">Hello Axios Result</h5>
            <button type="button" class="btn btn-info m-2" @click="requestAxios">Axios Interceptor count : {{
            GetRequestCount }}</button>
            <button type="button" class="btn btn-info m-2" @click="cookieAxios">Cookie Test (클라이언트 및 서버 쿠키)</button>
            <pre class="card-text"> {{ result }} </pre>
        </div>
    </div>
</template>

<script>
import { getAxios } from '@/common/axios-instance.js'
export default {
    name: "AxiosScaffold",
    methods: {
        cookieAxios() {
            $axios.get('http://localhost:8080/api/users/cookieSet') // from backend scaffold
                .then((res) => {
                    this.result = JSON.stringify(res, null, 2)
                })
        },
        requestAxios() {
            getAxios().get('/dummy.json')
                .then((res) => {
                    this.result = JSON.stringify(res, null, 2)
                })
        }
    },
    mounted() {
        this.requestAxios()
        // Make Cookie By Client
        // sameSite가 아니면 서버에서 받아가질 못함. (SameSite policy)
        // 어짜피 클라에서 Set 해서 보낼 일은 없을 듯. (Header 등을 이용)
        $cookies.set('MakeClient', 'FromClient222', '7d')
    },
    data() {
        return {
            result: ''
        }
    }
}
</script>

