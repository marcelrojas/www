import { slugify } from './utils';

export function generateJsonLd(options) {
  const {
    title,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author,
    siteName,
    type = "BlogPosting"
  } = options;

  const jsonData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "headline": title,
        "description": description,
        "image": {
          "@type": "ImageObject",
          "url": image
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
          "@type": "Person",
          "name": author,
          "url": `${url}/author/${slugify(author)}`
        },
        "publisher": {
          "@type": "Organization",
          "name": siteName,
          "logo": {
            "@type": "ImageObject",
            "url": `${url}/logo.png`
          }
        }
      }
    ]
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonData)}</script>`;
}

export function generateFaqJsonLd(faqs) {
  const jsonData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonData)}</script>`;
}

export function generateBreadcrumbJsonLd(items) {
  const jsonData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonData)}</script>`;
}
