import { PortableText } from '@portabletext/react';
import { generateFAQSchema } from '@/lib/schema';
import type { FAQ } from '@/lib/types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  // Generate schema.org FAQ markup for SEO
  const faqSchema = generateFAQSchema(
    faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
        .map(block => 
          block.children
            ?.map((child: any) => child.text)
            .join(' ') || ''
        )
        .join(' ')
    }))
  );

  return (
    <div className="space-y-6">
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-semibold">{faq.question}</h3>
            <div className="prose prose-lg dark:prose-invert">
              <PortableText value={faq.answer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}