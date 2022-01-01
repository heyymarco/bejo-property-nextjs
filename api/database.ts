import { SanityClient, default as sanityClient } from '@sanity/client'
import imageUrlBuilder  from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';



const isInServer = (typeof(window) === 'undefined');



let database : SanityClient;
let imageBuilder: ImageUrlBuilder
declare global {
    var __databaseCache: SanityClient | undefined;
}
const createNewDbConnection = (): SanityClient => sanityClient({
    projectId  : process.env.SANITY_PROJECT_ID,
    dataset    : process.env.SANITY_DATASET,
    apiVersion : '2021-03-25', // use current UTC date - see "specifying API version"!
    token      : process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
    useCdn     : true, // `false` if you want to ensure fresh data
});

if (isInServer) {
    // this is needed because in development we don't want to restart
    // the server with every change, but we want to make sure we don't
    // create a new connection to the DB with every change either.
    if (process.env.NODE_ENV === 'production') {
        // production:
        
        database = createNewDbConnection();
    }
    else {
        // development:
        
        if (!global.__databaseCache) global.__databaseCache = createNewDbConnection();
        database = global.__databaseCache;
    } // if

    imageBuilder = imageUrlBuilder(database);
} // if
export { database }



export const getImageUrl = (source: SanityImageSource) => imageBuilder.image(source)



export const getMainCategories = async () => await database.fetch<{
    slug  : string
    title : string
}[]>(`*[(_type == 'category') && (main == true)] { 'slug': slug.current, title }`);


export interface GetProductsOptions {
    mainCategory : string

    imageWidth   : number
    imageHeight  : number

    newest       : boolean
    maxCount     : number|null
    page         : number|null
}
export const getProducts = async (options?: Partial<GetProductsOptions>) => {
    const absOptions : GetProductsOptions = {
        ...{
            mainCategory: '',

            imageWidth  : 400,
            imageHeight : 500,

            newest      : false,
            
            maxCount    : null,
            page        : null,
        },
        ...options
    };
    const {
        mainCategory,

        imageWidth,
        imageHeight,

        newest,

        maxCount,
        page,
    } = absOptions;

    const data = await database.fetch<{
        slug      : string
        title     : string
        mainImage : SanityImageSource
        gallery   : SanityImageSource[]
    }[]>(`*[(_type == 'product') ${mainCategory ? ` && ('${mainCategory.toLowerCase()}' in categories[]->{'title': lower(title)}.title)` : ''}] ${newest ? ' | order(_createdAt desc)' : ''} ${maxCount ? ` [${(page ?? 0) * maxCount}...${maxCount}]` : '' } { 'slug': slug.current, title, mainImage, gallery }`);

    return data.map((item) =>({
        ...item,
        mainImage : getImageUrl(item.mainImage).width(imageWidth).height(imageHeight).url(),
        gallery   : item.gallery.map((gal) => getImageUrl(gal).width(imageWidth).height(imageHeight).url())
    }));
}

