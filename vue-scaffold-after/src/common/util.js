/*
- 토스트  사용에 필요
https://github.com/Maronato/vue-toastification -- Vue3 git
https://vue-toastification.maronato.dev/ -- Options
*/

import _ from 'lodash'
import { useToast } from "vue-toastification"

const toast = useToast()
const Util = {
    isEmpty: (val) => (val === null || val === '' || val === 'null'),
    clone: (data) => _.cloneDeep(data),
    uuid: () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    ),
    toast(type, msg) {
        let options = {
            position: "bottom-center",
            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        }

        switch (type) {
            case 'info': toast.info(msg, options); break;
            case 'success': toast.success(msg, options); break;
            case 'error': toast.error(msg, options); break;
            case 'warning': toast.warning(msg, options); break;
        }
    },
    keyMap(arrayObj, key, valKey = undefined) {
        if (arrayObj === undefined || arrayObj.length === 0)
            return []
        if (this.isEmpty(key) || this.isEmpty(arrayObj[0][key]))
            return console.warn("[keyMap key warn]: 해당 리스트에 존재하지 않는 키입니다. 사용 가능한 키 : " + Object.keys(arrayObj[0]))
        if (valKey !== undefined && this.isEmpty(arrayObj[0][valKey]))
            return console.warn("[keyMap valKey warn]: 해당 리스트에 존재하지 않는 키입니다. 사용 가능한 키 : " + Object.keys(arrayObj[0]))

        return arrayObj.reduce((stack, obj) => {
            stack[obj[key]] = (valKey === undefined) ? obj : obj[valKey]
            return stack
        }, {})
    },
    mixedFilter(originRow, compareRow, predicate = () => true) {
        if (compareRow === undefined || compareRow.length === 0) return originRow
        return originRow.filter(row => (compareRow.find(select => predicate(row, select)) !== undefined))
    }
}

const Emitter = {
    events: {
        /* eventName : { eventKey: eventFnc } */
    },
    on(eventName, eventFnc, eventKey) {
        if (eventKey === undefined) eventKey = 'defulat'
        if (this.events[eventName] === undefined || eventKey === 'default') this.events[eventName] = {}
        this.events[eventName][eventKey] = eventFnc
    },
    off(eventName, eventKey) {
        if (eventKey === undefined) eventKey = 'defulat'
        delete this.events[eventName][eventKey]
    },
    emit(eventName, sendData) {
        let fncObj = this.events[eventName]
        if (fncObj !== undefined) {
            let funcs = Object.values(fncObj)
            if (funcs.length === 0) {
                console.warn(`[Emitter warn]: "${eventName}"에 연결된 이벤트가 없습니다.`)
                return
            }

            Object.values(fncObj).forEach(fn => fn(sendData))
            return true
        }
        return false
    }

}

export { Util, Emitter }