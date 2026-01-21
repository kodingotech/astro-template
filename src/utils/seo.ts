import { SITE } from '@/config/site';

export interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    type?: 'website' | 'article' | 'profile';
}

export function generateSEO(props: SEOProps) {
    const title = props.title
        ? `${props.title} - ${SITE.name}`
        : SITE.title;
    
    const description = props.description || SITE.description;
    const image = props.image
        ? new URL(props.image, SITE.url).toString()
        : new URL(SITE.ogImage, SITE.url).toString();
    
    return {
        title,
        description,
        image,
        type: props.type || 'website',
        article: props.article,
        publishedTime: props.publishedTime,
        modifiedTime: props.modifiedTime,
    };
}