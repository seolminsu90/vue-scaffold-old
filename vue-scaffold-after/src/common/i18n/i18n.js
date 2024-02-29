// npm install vue-i18n@9
// https://vue-i18n.intlify.dev/guide/installation.html#package-managers

import en from './en.json'
import ko from './ko.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'ko',
    fallbackLocale: 'ko',
    messages: { en, ko }
})

export { i18n }
