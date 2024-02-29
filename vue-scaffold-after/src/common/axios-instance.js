
import axios from 'axios'
import BigInt from 'json-bigint'

/*
- 자체 ssl 로 api server 처리 시 오류 발생 대응

1. 비허가 인증 OFF
import https from "https";
axios.defaults.httpsAgent = new https.Agent({ 
    rejectUnauthorized: false // 비허가 인증 OFF
}); // 

2. 사설 인증서 허용
new https.Agent({ ca: fs.readFileSync(certPath) });
*/

const getAuthorization = () => {
    return ''
    // return store.getters['authStore/GetAuth'].accessToken -- store
}

const createAxios = (env, store) => {
    let options = {
        baseURL: '',
        timeout: 60000,
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'X-Default-Header': 'Hello world'
        },
        transformResponse: (response) => BigInt().parse(response)
    }

    if (env === 'production') {
        options.baseURL = ''
    } else {
        options.baseURL = '' // Backend Host
    }

    const axiosInstance = axios.create(options)

    axiosInstance.interceptors.request.use(
        function (config) { // 요청 시 config에 담은 값으로 여기서 활용 가능

            // Authorization같은 인증정보는 options 말고 request interceptor에 등록해서 매번 새로 가져올 수 있도록 한다.
            let authorization = config.headers['Authorization']
            if (authorization == null || authorization == undefined) config.headers['Authorization'] = getAuthorization()

            store.dispatch('SetRequestCount')
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    )

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            // error.response.status 처리 가능
            // ex) if (error.response && error.response.status === 403)
            return Promise.reject(error);
        }
    )

    axiosIns = axiosInstance
    return axiosInstance
}

// Vue 이외 js모듈 등에서 사용 시 getter로 가져다가 씀
let axiosIns
const getAxios = () => axiosIns

export { createAxios, getAxios }