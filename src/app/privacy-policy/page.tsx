import { Metadata } from 'next'
import { PrivacyPolicyContent } from '@/components/PrivacyPolicyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy | VacancyBee',
  description: 'VacancyBee\'s Privacy Policy explains how we collect, use, and protect your information.',
  alternates: {
    canonical: 'https://vacancybee.com/privacy-policy/',
  },
  openGraph: {
    title: 'Privacy Policy | VacancyBee',
    description: 'VacancyBee\'s Privacy Policy explains how we collect, use, and protect your information.',
    url: 'https://vacancybee.com/privacy-policy/',
    siteName: 'VacancyBee',
    type: 'website',
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <PrivacyPolicyContent />
    </div>
  )
}