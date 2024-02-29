const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    /*proxy: {
      '/api': { 
        target: 'https://backend.com',
        changeOrigin: true,
      }, 
    }*/
  }
})
