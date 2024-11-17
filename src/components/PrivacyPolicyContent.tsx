'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Mail, Globe } from 'lucide-react'

export function PrivacyPolicyContent() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold mb-2">Privacy Policy</CardTitle>
        <p className="text-muted-foreground">Effective Date: November 17, 2024</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-16 h-16 text-primary" />
        </div>
        <p className="mb-6 text-center">
          Welcome to VacancyBee (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, vacancybee.com (&quot;Website&quot;).
        </p>
        <ScrollArea className="h-[60vh] pr-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Information We Collect</AccordionTrigger>
              <AccordionContent>
                <h3 className="font-semibold mb-2">1. Information You Provide to Us</h3>
                <p className="mb-2">When you interact with our Website, you may provide information such as:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Personal Information:</strong> Your name, email address, or other details you submit via contact forms or newsletter sign-ups.</li>
                  <li><strong>Comments:</strong> Information you share when commenting on posts or interacting with content.</li>
                </ul>
                <h3 className="font-semibold mb-2">2. Information Collected Automatically</h3>
                <p className="mb-2">We may collect certain information automatically when you visit the Website, including:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Device Information:</strong> Your IP address, browser type, operating system, and device type.</li>
                  <li><strong>Usage Data:</strong> Pages viewed, time spent on pages, and other interactions with our Website.</li>
                  <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your browsing experience.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How We Use Your Information</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">We use the information collected to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide, operate, and maintain our Website.</li>
                  <li>Improve user experience and Website functionality.</li>
                  <li>Respond to your inquiries or requests.</li>
                  <li>Send updates, newsletters, or other communications (only if you opt-in).</li>
                  <li>Monitor and analyze trends to improve the content and layout of our Website.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Sharing Your Information</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">We do not sell, trade, or rent your personal information to others. However, we may share information in the following cases:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>With Service Providers:</strong> To assist in operating our Website (e.g., hosting services, analytics providers).</li>
                  <li><strong>Legal Obligations:</strong> If required to comply with applicable laws, regulations, or legal processes.</li>
                  <li><strong>Protective Actions:</strong> To safeguard the rights, property, or safety of VacancyBee, our users, or others.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Cookies and Tracking Technologies</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Cookies are small data files stored on your device. We use cookies to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Understand and save your preferences for future visits.</li>
                  <li>Compile aggregate data about site traffic and interactions to enhance our Website.</li>
                </ul>
                <p>You can manage cookie settings through your browser. Note that disabling cookies may affect some features of our Website.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Third-Party Links</AccordionTrigger>
              <AccordionContent>
                <p>Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of third-party websites before providing them with your information.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Security of Your Information</AccordionTrigger>
              <AccordionContent>
                <p>We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Your Data Rights</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Depending on your location, you may have rights regarding your personal data, including:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Accessing, correcting, or deleting your information.</li>
                  <li>Opting out of receiving marketing communications.</li>
                  <li>Objecting to or restricting certain data processing.</li>
                </ul>
                <p>To exercise your rights, please contact us at admin@vacancybee.com.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>Children&apos;s Privacy</AccordionTrigger>
              <AccordionContent>
                <p>Our Website is not directed at children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us to have it removed.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>Changes to This Privacy Policy</AccordionTrigger>
              <AccordionContent>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The &quot;Effective Date&quot; at the top of this page indicates when the latest changes were made.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
        <div className="mt-8 pt-6 border-t border-border">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">If you have questions or concerns about this Privacy Policy, please contact us at:</p>
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="w-5 h-5" />
            <p>admin@vacancybee.com</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <p>vacancybee.com</p>
          </div>
        </div>
        <p className="mt-8 text-center text-muted-foreground">Thank you for trusting VacancyBee with your information.</p>
      </CardContent>
    </Card>
  )
}