// nodestrap components:
import {
    Element,
}                           from '@nodestrap/element'
import {
    // react components:
    ContainerProps,
    Container,
}                           from '@nodestrap/container'



export interface GenericSectionProps extends ContainerProps {
}
export function GenericSection(props: GenericSectionProps) {
    return (
        <Container
            {...props}
            
            tag={props.tag ?? 'section'}
            classes={[...(props.classes ?? []),
                'fill',
            ]}
        />
    );
}
export default GenericSection;




export interface SectionProps extends GenericSectionProps {
    titleTag ?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'
    title    ?: string|React.ReactElement
    children  : React.ReactNode
}
export const Section = (props: SectionProps) => {
    const { titleTag = 'h2', title, children, ...restProps} = props;
    
    
    
    return (
        <GenericSection {...restProps}>
            <article>
                {title && <Element tag={titleTag}>
                    { title }
                </Element>}

                { children }
            </article>
        </GenericSection>
    );
}

export const MainSection = (props: SectionProps) => {
    return (
        <Section
            {...props}
            titleTag={props.titleTag ?? 'h1'}
        />
    );
}

export const SubSection = (props: SectionProps) => {
    return (
        <Section
            {...props}
            titleTag={props.titleTag ?? 'h3'}
        />
    );
}