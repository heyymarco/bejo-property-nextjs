import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { siteVarDecls } from '../website.config'
import { Navbar, NavbarMenu } from '@nodestrap/navbar'
import { useElementCssSize } from '@nodestrap/dimensions'
import { useAppContext } from './AppContext'



const Header: NextPage = (props: any) => {
    const setHeaderRef = useElementCssSize({ varHeight: siteVarDecls.headerHeight });
    const appContext = useAppContext();


    return (<header ref={setHeaderRef}>
        <Navbar
            theme='primary'
            // eslint-disable-next-line
            logo={<NavbarMenu><Link href='/'><Image src='/images/logo.png' width={60} height={60} /></Link></NavbarMenu>}
        >
            <NavbarMenu><Link href='/'>Beranda</Link></NavbarMenu>
            {
                (appContext.mainCategories ?? []).map((mainCategory: any, index: number) => (
                    <NavbarMenu key={index}><Link href={`/${mainCategory.slug}`}>Cari {mainCategory.title}</Link></NavbarMenu>
                ))
            }
            <NavbarMenu><Link href='/tentang'>Tentang</Link></NavbarMenu>
            <NavbarMenu href='https://www.instagram.com/heyyy.marco' target='_blank'>Instagram</NavbarMenu>
        </Navbar>
    </header>);
}

export default Header
