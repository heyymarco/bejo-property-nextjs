import type { NextPage } from 'next'

import { siteVarDecls } from '../website.config'
import { useElementCssSize } from '@nodestrap/dimensions'

import { GenericSection } from '../components/Section'



const Footer: NextPage = () => {
    const setFooterRef = useElementCssSize({ varHeight: siteVarDecls.footerHeight });
    
    
    
    return (<footer ref={setFooterRef}>
        <GenericSection theme='primary' mild={false}>
            <article>
                <h3>Kontak</h3>
                <p>0896-111-222-333</p>
            </article>
        </GenericSection>
    </footer>);
}

export default Footer