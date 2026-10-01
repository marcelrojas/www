import { describe, it, expect } from 'vitest';
import { generateJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from './jsonLD.js';

describe('generateFaqJsonLd', () => {
  it('should wrap JSON-LD output in script tag', () => {
    const faqs = [
      { question: 'What is Astro?', answer: 'Astro is a web framework for content-driven websites.' }
    ];
    const result = generateFaqJsonLd(faqs);

    expect(result.startsWith('<script type="application/ld+json">')).toBe(true);
    expect(result.endsWith('</script>')).toBe(true);
  });

  it('should generate valid FAQPage JSON schema for a single FAQ item', () => {
    const faqs = [
      { question: 'What is Astro?', answer: 'Astro is a web framework.' }
    ];
    const result = generateFaqJsonLd(faqs);
    const jsonString = result.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const data = JSON.parse(jsonString);

    expect(data).toEqual({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Astro?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Astro is a web framework.'
          }
        }
      ]
    });
  });

  it('should generate valid FAQPage JSON schema for multiple FAQ items', () => {
    const faqs = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
      { question: 'Q3', answer: 'A3' }
    ];
    const result = generateFaqJsonLd(faqs);
    const jsonString = result.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const data = JSON.parse(jsonString);

    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toHaveLength(3);
    expect(data.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Q1',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A1'
      }
    });
    expect(data.mainEntity[2]).toEqual({
      '@type': 'Question',
      name: 'Q3',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A3'
      }
    });
  });

  it('should handle empty FAQ array', () => {
    const result = generateFaqJsonLd([]);
    const jsonString = result.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const data = JSON.parse(jsonString);

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity).toEqual([]);
  });

  it('should escape special characters safely in question and answer text', () => {
    const faqs = [
      { question: 'Is "JSON" & <script> safe?', answer: 'Yes! It handles "quotes" & <tags>.' }
    ];
    const result = generateFaqJsonLd(faqs);
    const jsonString = result.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const data = JSON.parse(jsonString);

    expect(data.mainEntity[0].name).toBe('Is "JSON" & <script> safe?');
    expect(data.mainEntity[0].acceptedAnswer.text).toBe('Yes! It handles "quotes" & <tags>.');
  });
});

describe('generateJsonLd', () => {
  it('should generate default BlogPosting type schema with valid graph structure', () => {
    const options = {
      title: 'Test Article',
      description: 'Test Description',
      url: 'https://example.com/test',
      image: 'https://example.com/image.jpg',
      datePublished: '2025-01-01',
      dateModified: '2025-01-02',
      author: 'Jane Doe',
      siteName: 'Example Site'
    };

    const result = generateJsonLd(options);
    const jsonString = result.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const data = JSON.parse(jsonString);

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@graph']).toHaveLength(1);
    expect(data['@graph'][0]['@type']).toBe('BlogPosting');
    expect(data['@graph'][0].headline).toBe('Test Article');
    expect(data['@graph'][0].author.name).toBe('Jane Doe');
    expect(data['@graph'][0].author.url).toBe('https://example.com/test/author/jane-doe');
    expect(data['@graph'][0].publisher.name).toBe('Example Site');
  });

  it('should support custom schema type', () => {
    const options = {
      title: 'Article Title',
      description: 'Desc',
      url: 'https://example.com/article',
      image: 'https://example.com/img.jpg',
      datePublished: '2025-01-01',
      dateModified: '2025-01-01',
      author: 'John Smith',
      siteName: 'My Blog',
      type: 'NewsArticle'
    };

    const result = generateJsonLd(options);
    const jsonString = result.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const data = JSON.parse(jsonString);

    expect(data['@graph'][0]['@type']).toBe('NewsArticle');
  });
});

describe('generateBreadcrumbJsonLd', () => {
  it('should generate BreadcrumbList schema with 1-based indexing positions', () => {
    const items = [
      { name: 'Home', url: 'https://example.com/' },
      { name: 'Blog', url: 'https://example.com/blog' },
      { name: 'Post', url: 'https://example.com/blog/post' }
    ];

    const result = generateBreadcrumbJsonLd(items);
    const jsonString = result.replace('<script type="application/ld+json">', '').replace('</script>', '');
    const data = JSON.parse(jsonString);

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement).toHaveLength(3);
    expect(data.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com/'
    });
    expect(data.itemListElement[2]).toEqual({
      '@type': 'ListItem',
      position: 3,
      name: 'Post',
      item: 'https://example.com/blog/post'
    });
  });
});
