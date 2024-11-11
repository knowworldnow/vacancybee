import { PortableText } from '@portabletext/react';
import { generateFAQSchema } from '@/lib/schema';

interface FAQ {
  question: string;
  answer: any[];
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  // Generate FAQ schema only once
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
    <div data-faq-section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden"
          >
            <div className="p-4 bg-muted/50">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
            </div>
            <div 
              id={`faq-content-${index}`}
              className="p-4 prose prose-lg dark:prose-invert"
            >
              <PortableText value={faq.answer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}