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
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        }

        // Update Canonical
        const baseUrl = "https://www.onlineverywhere.com";
        const fullCanonical = `${baseUrl}${canonicalPath}`;
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', fullCanonical);
        } else {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            canonicalLink.setAttribute('href', fullCanonical);
            document.head.appendChild(canonicalLink);
        }

        // Update OG Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', fullTitle);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', fullCanonical);

        if (ogImage) {
            const ogImg = document.querySelector('meta[property="og:image"]');
            if (ogImg) ogImg.setAttribute('content', ogImage);
        }

    }, [title, description, canonicalPath, ogImage]);

    return null; // This component handles side effects only
};

export default SEO;
