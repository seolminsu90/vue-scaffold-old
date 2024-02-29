const { defineConfig } = require('@vue/cli-service')
// document : https://cli.vuejs.org/config/#publicpath
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
})
