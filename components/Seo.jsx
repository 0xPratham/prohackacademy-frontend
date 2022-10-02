import Head from 'next/head';

const Seo = (props) => {
    return (
        <>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta property="og:image" content="https://ctf.fix-assist.com/logo1.png" />
                <meta name="twitter:description" content="Pro Hack Academy is a continuous learning environment by fix-assist." />
                <meta property="og:title" content="Pro Hack Academy" />
                <meta property="og:locale" content="en_IN" />
                <meta name="description" content="Pro Hack Academy is a continuous learning environment by fix-assist." />
                <meta property="og:description" content="Pro Hack Academy is a continuous learning environment by fix-assist." />
                <link rel="canonical" href="https://ctf.fix-assist.com" />
                <meta property="og:url" content="https://ctf.fix-assist.com" />
                <meta property="og:site_name" content="Pro Hack Academy" />
                <meta name="twitter:card" content="summary" />
                <meta property="twitter:image" content="https://ctf.fix-assist.com/logo1.png" />
                <meta property="twitter:title" content="Pro Hack Academy" />
                <title>{props.title}</title>
                <meta name="apple-mobile-web-app-title" content="Pro Hack Academy" />
                <meta name="application-name" content="Pro Hack Academy" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
            </Head>
        </>
    )
}

export default Seo