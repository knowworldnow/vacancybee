import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper, Users2, Shield, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - VacancyBee',
  description: 'Learn about VacancyBee, your ultimate destination for authentic and engaging celebrity insights, founded by Shoumya Chowdhury and Anmita Das.',
  alternates: {
    canonical: 'https://vacancybee.com/about/',
  },
  openGraph: {
    title: 'About Us - VacancyBee',
    description: 'Learn about VacancyBee, your ultimate destination for authentic and engaging celebrity insights, founded by Shoumya Chowdhury and Anmita Das.',
    url: 'https://vacancybee.com/about/',
  },
};

const teamMembers = [
  {
    name: 'Shoumya Chowdhury',
    role: 'Co-founder & Web Developer',
    image: '/shoumya.webp',
    description: 'An Electrical and Electronic Engineering (EEE) graduate from CUET, Shoumya brings technical expertise and love for writing to VacancyBee. Currently thriving as a web developer, he channels his enthusiasm for knowledge-sharing into crafting comprehensive, fact-checked content.',
  },
  {
    name: 'Anmita Das',
    role: 'Co-founder & Web Developer',
    image: '/anmita.webp',
    description: 'An EEE graduate from CUET, Anmita is a dedicated web developer with a creative flair for writing. She is deeply passionate about producing accurate, insightful content that resonates with readers.',
  },
];

const features = [
    {
      icon: Shield,
      title: 'Authenticity You Can Trust',
      description: 'Our content is rooted in rigorous research and a commitment to accuracy.',
    },
    {
      icon: Newspaper,
      title: 'Engaging and Insightful',
      description: 'We strive to create stories that entertain, inform, and inspire.',
    },
    {
      icon: BookOpen,
      title: 'Passion for Knowledge',
      description: "Blogging isn't just a hobby for us—it's our way of making a difference by sharing real, reliable information.",
    },
    {
      icon: Users2,
      title: 'Community Focused',
      description: "Whether you're a curious reader or a pop culture enthusiast, we're here to enlighten and entertain you.",
    },
  ];

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-16">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to VacancyBee, your ultimate destination for authentic and engaging celebrity insights. We are committed to delivering well-researched and reliable information about the world&apos;s most captivating personalities.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">Who We Are</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="aspect-square relative mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 py-12 rounded-lg">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">What We Do</h2>
          <p className="text-muted-foreground">
            At VacancyBee, we specialize in providing readers with trustworthy information about celebrities. From their personal lives and careers to lesser-known facts and updates, every article is carefully curated to ensure it meets our high standards of authenticity. We aim to be your go-to source for credible content, free from sensationalism or misinformation.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose VacancyBee?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center max-w-3xl mx-auto bg-primary/5 p-8 rounded-lg">
        <p className="text-lg mb-4">
          Thank you for visiting VacancyBee. We look forward to sharing this journey of knowledge and discovery with you!
        </p>
        <p className="text-muted-foreground">
          Whether you&apos;re seeking genuine stories about your favorite personalities or looking for reliable celebrity information, VacancyBee is here for you.
        </p>
      </section>
    </div>
  );
}