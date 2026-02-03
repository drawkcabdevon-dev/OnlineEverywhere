import React, { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    canonicalPath?: string; // e.g., "/services"
    ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath = "", ogImage }) => {
    useEffect(() => {
        // Update Title
        const fullTitle = `${title} | OnLineEverywhere`;
        document.title = fullTitle;

        // Update Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);

        // Update Canonical
        const baseUrl = "https://www.onlineverywhere.com";
        const fullCanonical = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', fullCanonical);

        // Update OG Tags
        const updateOrCreateMeta = (property: string, content: string) => {
            let el = document.querySelector(`meta[property="${property}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('property', property);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        updateOrCreateMeta('og:title', fullTitle);
        updateOrCreateMeta('og:description', description);
        updateOrCreateMeta('og:url', fullCanonical);
        updateOrCreateMeta('og:type', 'website');

        const finalOgImage = ogImage || `${baseUrl}/og-image.jpg`;
        updateOrCreateMeta('og:image', finalOgImage);

        // Update Twitter Tags
        const updateOrCreateTwitter = (name: string, content: string) => {
            let el = document.querySelector(`meta[name="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('name', name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        updateOrCreateTwitter('twitter:card', 'summary_large_image');
        updateOrCreateTwitter('twitter:title', fullTitle);
        updateOrCreateTwitter('twitter:description', description);
        updateOrCreateTwitter('twitter:image', finalOgImage);

    }, [title, description, canonicalPath, ogImage]);

    return null; // This component handles side effects only
};

export default SEO;
