import { config as iconConfig } from '@nodestrap/icon'
import { createSheet, globalDef, rules, rule, atRoot, fontFace, layout, vars } from '@cssfn/cssfn'
import { createCssVar } from '@cssfn/css-var'
import { colors, defineTheme, defineForeg } from '@nodestrap/colors'
import Color from 'color'



interface SiteVars {
    windowHeight   : any
    headerHeight   : any
    footerHeight   : any
    viewportHeight : any
}
export const [siteVars, siteVarDecls] = createCssVar<SiteVars>({ minify: false });



createSheet(() => [
    globalDef([
        rule('*', [
            layout({
                boxSizing : 'border-box',
            }),
        ]),

        rule('html', [
            layout({
                blockSize: '100%',
            }),
        ]),
        rule(['html', 'body'], [
            layout({
                padding : '0px',
                margin  : '0px',
            }),
        ]),
        rule('body>*>header', [
            layout({
                zIndex          : 1020,
                position        : 'sticky',
                insetBlockStart : '0px',
            }),
        ]),

        rule('a', [
            layout({
                color          : 'inherit',
                textDecoration : 'none',
            }),
        ]),
        
        rule(['.logo', '.logo>a'], [
            layout({
                display: 'inline-flex',
                width: '50px',
                height: '50px',
            }),
        ]),

        atRoot([
            vars({
                [siteVarDecls.viewportHeight] : `calc(${siteVars.windowHeight} - ${siteVars.headerHeight})`,
            }),
        ]),
    ]),
])
.attach();



const primary = Color('#06366B');
defineTheme('primary', primary);

const secondary = primary.rotate(-30).darken(0.2);
defineTheme('secondary', secondary);

const darkColor = primary.darken(0.5);
const lightColor = primary.lighten(4);
colors.dark = darkColor as any;
colors.light = lightColor as any;
colors.primaryText = lightColor as any;
colors.primaryBold = darkColor as any;
(colors as any).primaryThinner = primary.alpha(0.1) as any;
defineForeg(darkColor);


// iconConfig.img.files.push('paulina-logo.svg');
iconConfig.img.files.push('scroll-down.svg');