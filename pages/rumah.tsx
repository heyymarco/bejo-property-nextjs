import Head from 'next/head'

import { getProducts } from '../api/database'
import type { ReturnPromisePropsType } from '../api/types'
import ShowProducts from '../routes/ShowProducts'



export const getServerSideProps = async (context: any) => {
    const [products] = await Promise.all([
        getProducts({ mainCategory: 'rumah', imageWidth: 600, imageHeight: 450, newest: true, maxCount: 50 }),
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
            <title>Cari Rumah di BejoProperti.com</title>
            <meta name="description" content="Cari Rumah di BejoProperti.com" />
        </Head>
        <ShowProducts {...props} >
            <h2>Info Rumah</h2>
        </ShowProducts>
    </>);
}

export default Page
