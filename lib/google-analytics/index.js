export const pageview = (url) => {
    window.gtag('config', process.env.GOOGLE_ANALYTICS, {
        path_url: url,
    })
}