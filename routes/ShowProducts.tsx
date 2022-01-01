import { layout, compositionOf, descendants } from '@cssfn/cssfn'
import { createUseSheet } from '@cssfn/react-cssfn'

import { spacers } from '@nodestrap/spacers'
import { Carousel } from '@nodestrap/carousel'

import { GenericSection } from '../components/Section'
import type { getProducts } from '../api/database'
import type { ReturnPromisePropsType } from '../api/types'



const useSheet = createUseSheet(() => {
    return [
        compositionOf('gallery', [
            layout({
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: spacers.default,
                justifyContent: 'center', // makes left & right paddings are equal

                ...descendants('.thumb', [
                    layout({
                        width: '600px',
                        // height: '300px',
                        aspectRatio: 1.33,
                        flex: [[0, 1, 'auto']],
                    }),
                ]),
            }),
        ]),
    ];
}, /*sheetId :*/'products');



export interface ShowProductsProps {
    products  : ReturnPromisePropsType<typeof getProducts>
    children ?: React.ReactNode
}
const Page = (props: ShowProductsProps) => {
    const sheet = useSheet();
    
    
    const {
        products,
    } = props;
    return (<>
        <GenericSection>
            <article>
                { props.children }
                <div className={sheet.gallery}>
                    {
                        products.map((product, index: number) => (
                            <Carousel key={index} classes={['thumb']} theme='primary' infiniteLoop={true}>
                                {
                                    [product.mainImage, ...product.gallery].map((imageUrl, index) => (
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
