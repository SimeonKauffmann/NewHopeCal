module.exports = {
    publicPath: "/newhopecal",
    pwa: {
        manifestOptions: {
            background_color: "White"

    },
    name: 'New Hope',
    themeColor: 'White',
    workboxOptions: {
      runtimeCaching: [
        {
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern: '/holidaysBackup2021'
        },
        {
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern: 'https://type.fit/api/quotes'
        },
        {
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern:
            'http://azureadsimeonkauffmann-fcccfdf1.localhost.run/events/'
        }
      ]
    }
  },
  devServer: {
    proxy: {
      '/calanderAPI': {
        changeOrigin: true,
        // logLevel: "debug", < Check if this code logged in like link.
        pathRewrite: { '^/calanderAPI': '' }, //<<<THIS GOTDAMNIT FIX EVERYTHING
        target: 'https://date.nager.at/api'
        // target: "https://cors.bridged.cc/https://date.nager.at/api/v2/publicholidays/2021/SE"
        // target: "https://avancera.app/cities/" < Test Run fetch if the link get error
        // https://type.fit/api/quotes
      }
    }
  }
}
