'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { generateFAQSchema } from '@/lib/schema';
import type { FAQ } from '@/lib/types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left bg-muted/50 hover:bg-muted/80 transition-colors"
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <ChevronDown 
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 prose prose-lg dark:prose-invert">
                <PortableText value={faq.answer} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}