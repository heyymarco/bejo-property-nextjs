import Head from 'next/head'

import { getProducts } from '../api/database'
import type { ReturnPromisePropsType } from '../api/types'
import ShowProducts from '../routes/ShowProducts'



export const getServerSideProps = async (context: any) => {
    const [products] = await Promise.all([
        getProducts({ mainCategory: 'tanah', imageWidth: 600, imageHeight: 450, newest: true, maxCount: 50 }),
    ]);

    return {
        props: {
            products,
        }
    }
}

const Page = (props: { products: ReturnPromisePropsType<typeof getProducts> }) => {
    return (<>
        <Head>
            <title>Cari Tanah di BejoProperti.com</title>
            <meta name="description" content="Cari Tanah di BejoProperti.com" />
        </Head>
        <ShowProducts {...props} >
            <h2>Info Tanah</h2>
        </ShowProducts>
    </>);
}

export default Page
