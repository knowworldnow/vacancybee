import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | VacancyBee',
  description: 'VacancyBee\'s Privacy Policy explains how we collect, use, and protect your information.',
  alternates: {
    canonical: 'https://vacancybee.com/privacy-policy/',
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4"><strong>Effective Date:</strong> November 17, 2024</p>
      
      <p className="mb-4">Welcome to VacancyBee ("we," "our," or "us"). Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, vacancybee.com ("Website"). By accessing or using our Website, you agree to the practices outlined in this policy.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">1. Information You Provide to Us</h3>
      <p className="mb-4">When you interact with our Website, you may provide information such as:</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Personal Information:</strong> Your name, email address, or other details you submit via contact forms or newsletter sign-ups.</li>
        <li><strong>Comments:</strong> Information you share when commenting on posts or interacting with content.</li>
      </ul>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">2. Information Collected Automatically</h3>
      <p className="mb-4">We may collect certain information automatically when you visit the Website, including:</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Device Information:</strong> Your IP address, browser type, operating system, and device type.</li>
        <li><strong>Usage Data:</strong> Pages viewed, time spent on pages, and other interactions with our Website.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your browsing experience.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <p className="mb-4">We use the information collected to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Provide, operate, and maintain our Website.</li>
        <li>Improve user experience and Website functionality.</li>
        <li>Respond to your inquiries or requests.</li>
        <li>Send updates, newsletters, or other communications (only if you opt-in).</li>
        <li>Monitor and analyze trends to improve the content and layout of our Website.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
      <p className="mb-4">We do not sell, trade, or rent your personal information to others. However, we may share information in the following cases:</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>With Service Providers:</strong> To assist in operating our Website (e.g., hosting services, analytics providers).</li>
        <li><strong>Legal Obligations:</strong> If required to comply with applicable laws, regulations, or legal processes.</li>
        <li><strong>Protective Actions:</strong> To safeguard the rights, property, or safety of VacancyBee, our users, or others.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking Technologies</h2>
      <p className="mb-4">Cookies are small data files stored on your device. We use cookies to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Understand and save your preferences for future visits.</li>
        <li>Compile aggregate data about site traffic and interactions to enhance our Website.</li>
      </ul>
      <p className="mb-4">You can manage cookie settings through your browser. Note that disabling cookies may affect some features of our Website.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Links</h2>
      <p className="mb-4">Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of third-party websites before providing them with your information.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Security of Your Information</h2>
      <p className="mb-4">We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Data Rights</h2>
      <p className="mb-4">Depending on your location, you may have rights regarding your personal data, including:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Accessing, correcting, or deleting your information.</li>
        <li>Opting out of receiving marketing communications.</li>
        <li>Objecting to or restricting certain data processing.</li>
      </ul>
      <p className="mb-4">To exercise your rights, please contact us at admin@vacancybee.com.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
      <p className="mb-4">Our Website is not directed at children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us to have it removed.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
      <p className="mb-4">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The "Effective Date" at the top of this page indicates when the latest changes were made.</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-4">If you have questions or concerns about this Privacy Policy, please contact us at:</p>
      <p className="mb-4">
        Email: admin@vacancybee.com<br />
        Website: vacancybee.com
      </p>
      
      <p className="mt-8">Thank you for trusting VacancyBee with your information.</p>
    </div>
  )
}