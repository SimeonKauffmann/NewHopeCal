module.exports = {
  publicPath: ".",
  pwa: {
    manifestOptions: {
      background_color: 'White'
    },
    name: 'New Hope',
    themeColor: 'White',
    workboxOptions: {
      runtimeCaching: [
        {
          // Caching the holidays
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern: 'https://date.nager.at/api/v2/publicholidays/2021/SE'
        },
        {
          // Caching the quotes
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern: 'http://api.quotable.io/random'
        },
        {
          // Caching the events
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern: 'http://061844f18b6a.ngrok.io/events/'
        }
      ]
    }
  },
  devServer: {
    proxy: {
      '/calanderAPI': {
        changeOrigin: true,
        // logLevel: "debug",
        pathRewrite: { '^/calanderAPI': '' },
        target: 'https://date.nager.at/api'
      }
    }
  }
}
