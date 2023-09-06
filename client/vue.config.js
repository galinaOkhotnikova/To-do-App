const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({

  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  configureWebpack: {
        resolve: {
            alias: {
            '@graphql': path.resolve('graphql/'),
            '@src': path.resolve('src/')
            },
            extensions: ['.js', '.vue', '.json']
        }
    }
})
