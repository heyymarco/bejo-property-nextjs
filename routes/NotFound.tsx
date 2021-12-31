import type { NextPage } from 'next'
import Head from 'next/head'
import { GenericSection } from '../components/Section'
import { layout, compositionOf, children, variants } from '@cssfn/cssfn'
import { createUseSheet } from '@cssfn/react-cssfn'
import { siteVars } from '../website.config'
import { colors } from '@nodestrap/colors'
import { borders } from '@nodestrap/borders'
import { isScreenWidthAtLeast } from '@nodestrap/breakpoints'
import { cssProps as containerConfig } from '@nodestrap/container'
import { usesThemeVariant } from '@nodestrap/basic'



const useSheet = createUseSheet(() => {
    const [, themeRefs] = usesThemeVariant();
    
    return [
        compositionOf('construction', [
            layout({
                ...children('&&', [
                    layout({
                        minBlockSize: `calc(${siteVars.viewportHeight} - ${siteVars.footerHeight})`,
                        display: 'grid',
                        gridTemplateColumns: [['1fr']],
                        gridTemplateRows: [['2fr', '1fr', '1fr']],
                        gridTemplateAreas: [[
                            '"illus"',
                            '"shared"',
                            '"content"',
                        ]],
                        justifyItems: 'center',
                        alignItems: 'center',

                        borderBlockStartWidth: borders.hair,
                        borderColor: themeRefs.backg,
            
                        ...children('.illustration', [
                            layout({
                                gridArea: 'illus/illus / content/content',

                                position: 'absolute', // do not taking space
                                // justifySelf: 'stretch',
                                // alignSelf: 'stretch',
                                // width: '100%',
                                // height: '100%',
                                inlineSize: `calc(100% + (2 * ${containerConfig.paddingInline}))`,
                                blockSize: `calc(100% + (2 * ${containerConfig.paddingBlock}))`,
                                objectFit: 'cover',
                                objectPosition: '50% 35%',

                            }),
                        ]),
                        ...children('article', [
                            layout({
                                gridArea: 'shared/shared / content/content',
                                alignSelf: 'end',

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
            
                                backgroundImage: [
                                    `linear-gradient(${(colors as any).primaryThinner}, ${(colors as any).primaryThinner})`,
                                    'linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3))',
                                ],
                                border: `solid 1px ${colors.white}`,
                                backdropFilter: [['blur(10px)']],
                                filter: [[`drop-shadow(0px 0px 10px ${colors.primaryBold})`]],
            
                                paddingInline: containerConfig.paddingInline,
                                paddingBlock: containerConfig.paddingBlock,
            
                                // marginInline: `calc(0px - ${containerConfig.paddingInline})`,
                                // marginBlock: `calc(0px - ${containerConfig.paddingBlock})`,
                                // inlineSize: `calc(100% + (2 * ${containerConfig.paddingInline}))`
                                inlineSize: '100%',

                                ...children('*', [
                                    layout({
                                        fontWeight: '400 !important',
                                    }),
                                ]),
                            }),
                        ]),
                    }),
                    variants([
                        isScreenWidthAtLeast('sm', [
                            layout({
                                // background: 'red',
                                gridTemplateColumns: [['1fr', '1fr', '1fr']],
                                gridTemplateRows: [['1fr']],
                                gridTemplateAreas: [[
                                    '"illus shared content"',
                                ]],
            
                                ...children('.illustration', [
                                    layout({
                                        gridArea: 'illus/illus / shared/shared',
                                    }),
                                ]),
                                ...children('article', [
                                    layout({
                                        gridArea: 'shared/shared / content/content',
                                    }),
                                ]),
                            })
                        ])
                    ]),
                ]),
            }),
        ]),
    ];
}, /*sheetId :*/'not-found');



const Page : NextPage = () => {
    const sheet = useSheet();

    return (<>
        <Head>
            <title>Halaman Tidak Ditemukan</title>
            <meta name="description" content="Maaf, halaman yang anda cari tidak ditemukan." />
        </Head>
        <GenericSection classes={[sheet.construction]} theme='primary' mild={true}>
            <img className='illustration' src='/images/page-not-found.svg' alt='' />
            <article>
                <h1>
                    Halaman Tidak Ditemukan
                </h1>
                <p className='lead'>
                    Maaf, halaman yang anda cari tidak ditemukan.
                </p>
            </article>
        </GenericSection>
    </>);
}
export default Page;
