import React from 'react'
import type {AppProps} from 'next/app'

import '../styles/globals.css'

function MyApp({Component, pageProps}: AppProps) {
    return <div className={`bg-[#2C2D33] text-white `}>
        <Component {...pageProps} />
    </div>
}

export default MyApp
