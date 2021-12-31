import Head from 'next/head';
import { default as App, AppProps } from 'next/app'

import { UseWindowCssSize } from '@nodestrap/dimensions'

import { siteVarDecls } from '../website.config'

import {AppContextProvider} from '../components/AppContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getMainCategories } from '../api/database';
import { useMemo } from 'react';



const isInServer = (typeof(window) === 'undefined');



function MyApp({ Component: Outlet, pageProps, mainCategories }: AppProps & { mainCategories: any }) {
    return (<AppContextProvider {...{
        mainCategories: useMemo(() => mainCategories, []),
    }}>
        <UseWindowCssSize options={{ varHeight: siteVarDecls.windowHeight }} />
        
        <Head>
            <link rel='icon' type='image/svg+xml' href='images/logo.png' />
        </Head>

        <Header />
        
        <main>
            <Outlet {...pageProps} />
        </main>
        
        <Footer />
    </AppContextProvider>);
}
if (isInServer) {
    MyApp.getInitialProps = async (appContext: any) => {
        // calls page's `getInitialProps` and fills `appProps.pageProps`
        const appProps = await App.getInitialProps(appContext);
    
        const mainCategories = await getMainCategories();
        return {
            ...appProps,
            mainCategories,
        };
    };
} // if

export default MyApp
