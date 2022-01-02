import Head from 'next/head'

import { rule, layout, compositionOf, children, variants, descendants } from '@cssfn/cssfn'
import { createUseSheet } from '@cssfn/react-cssfn'

import gens from '@nodestrap/typos'
import { colors } from '@nodestrap/colors'
import { spacers } from '@nodestrap/spacers'
import { isScreenWidthSmallerThan } from '@nodestrap/breakpoints'
import { Icon } from '@nodestrap/icon'
import { Carousel } from '@nodestrap/carousel'

import { siteVars } from '../website.config'
import { GenericSection } from '../components/Section'
import { getProducts } from '../api/database'
import type { ReturnPromisePropsType } from '../api/types'
// @ts-ignore
import * as blockContent from '@sanity/block-content-to-react'
// console.log('blockContent = ', typeof(blockContent))
const BlockContent = blockContent;



const useSheet = createUseSheet(() => {
    return [
        compositionOf('hero', [
            layout({
                ...children('&&', [
                    layout({
                        minBlockSize: siteVars.viewportHeight,
                        boxSizing: 'border-box',
                        backgroundImage: [
                            `url("/images/hero-backg.svg")`,
                            `linear-gradient(20deg, ${colors.primaryThin}, ${colors.white})`
                        ] as any,
                        backgroundSize: 'cover',
                        backgroundPosition: '50% 40%',
                        backgroundRepeat: 'no-repeat',
            
                        display: 'grid',
                        gridTemplateColumns: [['1fr', '1fr']],
                        gridTemplateRows: [['2fr', 'max-content', '2fr', '20px', 'auto']],
                        gridTemplateAreas: [[
                            '"....... ......."',
                            '"....... content"',
                            '"....... ......."',
                            '"footer   footer"',
                            '"footer   footer"',
                        ]],
                    }),
                    variants([
                        isScreenWidthSmallerThan('sm', [
                            layout({
                                // backgroundColor: 'red',
                                // gridTemplateColumns: [['2fr', '5fr']],
                            }),
                        ]),
                        isScreenWidthSmallerThan('sm', [
                            layout({
                                // backgroundColor: 'red',
                                gridTemplateColumns: [['2fr', '5fr']],
                            }),
                        ]),
                    ]),
                ]),

                ...children('article', [
                    layout({
                        gridArea: 'content',

                        display: 'grid',
                        justifyContent: 'center',
                        alignContent: 'center',

                        background: [
                            `linear-gradient(${(colors as any).primaryThinner}, ${(colors as any).primaryThinner})`,
                            'linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3))',
                        ],
                        color: colors.dark,
                        border: `solid 1px ${colors.primaryBold}`,
                        backdropFilter: [['blur(5px)']],
                        filter: [[`drop-shadow(0px 0px 10px ${colors.primaryBold})`]],

                        paddingBlock: spacers.lg,
                        paddingInline: spacers.lg,
                        gap: spacers.default,
                        marginBlockEnd: spacers.default,

                        ...children('*', [
                            layout({
                                fontWeight: '700 !important',
                                margin: '0px !important',
                            }),
                            variants([
                                rule(':is(h1,h2,h3,h4,h5,h6,.lead)', [
                                    layout({
                                        textAlign: 'center',
                                    }),
                                ]),
                            ]),
                        ]),
                        ...children('.display', [
                            layout({
                                fontSize: [['calc(', 2.5, '*', gens.fontSize, ')']],
                            }),
                            variants([
                                isScreenWidthSmallerThan('md', [
                                    layout({
                                        // color: 'blue',
                                        fontSize: [['calc(', 1.75, '*', gens.fontSize, ')']],
                                    }),
                                ]),
                            ]),
                            variants([
                                isScreenWidthSmallerThan('sm', [
                                    layout({
                                        // color: 'red',
                                        fontSize: [['calc(', 1.25, '*', gens.fontSize, ')']],
                                    }),
                                ]),
                            ]),
                        ]),
                    }),
                ]),
                ...children('footer', [
                    layout({
                        gridArea: 'footer',

                        borderBlockStart: `solid 1px ${colors.primaryBold}`,
                        backgroundImage: [
                            `linear-gradient(0deg, ${colors.primary}, ${(colors as any).primaryThin})`,
                        ],
                        backdropFilter: [['blur(5px)']],

                        display: 'grid',
                        gridTemplateColumns: [['1fr', 'max-content', '1fr']],
                        gridTemplateRows: [['1fr']],
                        gridTemplateAreas: [[
                            '"left middle right"',
                        ]],

                        padding: '0.5em',

                        alignItems: 'center',

                        ...children('.scroller', [
                            layout({
                                gridArea: 'middle',
                                justifySelf: 'center',
                            }),
                        ]),
                        ...children('.message', [
                            layout({
                                gridArea: 'right',
                                justifySelf: 'start',
                                margin: '0px',
                                marginInlineStart: spacers.default,
                            }),
                        ]),
                    }),
                ]),
            }),
        ]),
        compositionOf('gallery', [
            layout({
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: spacers.default,
                justifyContent: 'center', // makes left & right paddings are equal

                ...descendants('.thumb', [
                    layout({
                        width: '400px',
                        // height: '300px',
                        aspectRatio: 1.33,
                        flex: [[0, 1, 'auto']],
                    }),
                ]),
            }),
        ]),
    ];
}, /*sheetId :*/'home');



export const getServerSideProps = async (context: any) => {
    const [rumahs, tanahs] = await Promise.all([
        getProducts({ mainCategory: 'rumah', imageWidth: 400, imageHeight: 300, newest: true, maxCount: 12 }),
        getProducts({ mainCategory: 'tanah', imageWidth: 400, imageHeight: 300, newest: true, maxCount: 12 })
    ]);

    return {
        props: {
            rumahs,
            tanahs,
        }
    }
}



const Page = (props: ReturnPromisePropsType<typeof getServerSideProps>) => {
    const sheet = useSheet();
    
    
    const {
        rumahs,
        tanahs,
    } = props;
    return (<>
        <Head>
            <title>BejoProperti.com</title>
            <meta name="description" content="Jual/beli rumah, tanah, villa, apartemen, dll." />
        </Head>
        <GenericSection classes={[sheet.hero]}>
            <article>
                <h1>Situs Jual Beli Properti</h1>
                <h6>Rumah | Tanah | Jual | Sewa</h6>
                <p className='lead'>
                    Selamat datang di BejoProperti.com
                </p>
                <p>
                    Kami menyediakan berbagai macam informasi jual/beli rumah, tanah, villa, apartemen, dll.
                </p>
            </article>
            <footer className='fill'>
                <Icon classes={['scroller']} icon='scroll-down' theme='light' size='lg' />
                <p className='message'>
                    scroll ke bawah untuk info lebih lanjut
                </p>
            </footer>
        </GenericSection>
        <GenericSection>
            <article>
                <h2>Info Rumah</h2>
                <BlockContent test='suck' blocks={rumahs.content} />
                <p></p>
                <div className={sheet.gallery}>
                    {
                        rumahs.items.map((rumah, index: number) => (
                            <Carousel key={index} classes={['thumb']} theme='primary' infiniteLoop={true}>
                                {
                                    [rumah.mainImage, ...rumah.gallery].map((imageUrl, index) => (
                                        <img key={index} src={imageUrl} alt='' />
                                    ))
                                }
                            </Carousel>
                        ))
                    }
                </div>
            </article>
        </GenericSection>
        <GenericSection theme='secondary' mild={true}>
            <article>
                <h2>Info Tanah</h2>
                <BlockContent test='suck' blocks={tanahs.content} />
                <p></p>
                <div className={sheet.gallery}>
                    {
                        tanahs.items.map((tanah, index: number) => (
                            <Carousel key={index} classes={['thumb']} theme='primary' infiniteLoop={true}>
                                {
                                    [tanah.mainImage, ...tanah.gallery].map((imageUrl, index) => (
                                        <img key={index} src={imageUrl} alt='' />
                                    ))
                                }
                            </Carousel>
                        ))
                    }
                </div>
            </article>
        </GenericSection>
    </>);
}

export default Page
