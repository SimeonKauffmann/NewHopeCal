module.exports = {
    pwa: {
        manifestOptions: {
            background_color: "White"

        },
        name: "New Hope",
        themeColor: "White",
        workboxOptions: {
            runtimeCaching: [
                {
                    handler: "HolidayFetch",
                    options: {
                        networkTimeoutSeconds: 5
                    },
                    urlPattern: "https://date.nager.at/api/v2/publicholidays/2021/SE"
                }
            ]
        }
    },
    devServer: {
        proxy: {
            '/api': {
                changeOrigin: true,
                // logLevel: "debug", < Check if this code logged in like link.
                pathRewrite: { '^/api': '' }, //<<<THIS GOTDAMNIT FIX EVERYTHING
                target: 'https://date.nager.at/api'
                // target: "https://avancera.app/cities/" < Test Run fetch if the link get error
            }
            
        }
    }
}