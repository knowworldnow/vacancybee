import {
  LinkedinIcon,
  GlobeIcon,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLinksProps {
  social: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}

interface SocialPlatform {
  name: string;
  icon: LucideIcon | React.FC;
  url: (handle: string) => string;
  color: string;
}

// Custom X (Twitter) icon
function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

// Custom Meta (Facebook) icon
function MetaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8z" />
      <path d="M10 17v-6a2 2 0 0 1 4 0v6" />
      <path d="M10 11h4" />
    </svg>
  );
}

// Custom Instagram icon
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const platforms: SocialPlatform[] = [
  {
    name: 'twitter',
    icon: XIcon,
    url: (handle) => `https://x.com/${handle.replace('@', '')}`,
    color: 'hover:text-foreground',
  },
  {
    name: 'instagram',
    icon: InstagramIcon,
    url: (handle) => `https://instagram.com/${handle.replace('@', '')}`,
    color: 'hover:text-[#E4405F]',
  },
  {
    name: 'facebook',
    icon: MetaIcon,
    url: (handle) => `https://facebook.com/${handle}`,
    color: 'hover:text-[#0866FF]',
  },
  {
    name: 'linkedin',
    icon: LinkedinIcon,
    url: (handle) => `https://linkedin.com/in/${handle}`,
    color: 'hover:text-[#0A66C2]',
  },
  {
    name: 'website',
    icon: GlobeIcon,
    url: (url) => url.startsWith('http') ? url : `https://${url}`,
    color: 'hover:text-primary',
  },
];

export function SocialLinks({ social }: SocialLinksProps) {
  const activePlatforms = platforms.filter(
    (platform) => social[platform.name as keyof typeof social]
  );

  if (activePlatforms.length === 0) return null;

  return (
    <div className="flex justify-center gap-2">
      {activePlatforms.map((platform) => {
        const handle = social[platform.name as keyof typeof social];
        if (!handle) return null;

        const Icon = platform.icon;
        return (
          <Button
            key={platform.name}
            variant="ghost"
            size="icon"
            asChild
            className={platform.color}
          >
            <a
              href={platform.url(handle)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Follow on ${platform.name === 'twitter' ? 'X' : platform.name}`}
            >
              <Icon />
              <span className="sr-only">
                Follow on {platform.name === 'twitter' ? 'X' : platform.name}
              </span>
            </a>
          </Button>
        );
      })}
    </div>
  );
}