import { Instagram, Youtube, Facebook } from "lucide-react"; 
import Link from "next/link";

interface SocialIconsProps {
  size?: number;
  className?: string;
}

export function SocialIcons({ size = 20, className = "" }: SocialIconsProps) {
  const links = {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL || "",
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL || "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL || "",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL || "",
  };

  const IconLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => {
    if (!href) return null;
    return (
      <Link
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground transition-colors hover:text-primary"
      >
        {children}
      </Link>
    );
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Facebook */}
      <IconLink href={links.facebook} label="Facebook">
        <Facebook size={size} />
      </IconLink>

      {/* Instagram */}
      <IconLink href={links.instagram} label="Instagram">
        <Instagram size={size} />
      </IconLink>

      {/* TikTok */}
      <IconLink href={links.tiktok} label="TikTok">
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      </IconLink>

      {/* YouTube */}
      <IconLink href={links.youtube} label="YouTube">
        <Youtube size={size} />
      </IconLink>
    </div>
  );
}

export default SocialIcons;
