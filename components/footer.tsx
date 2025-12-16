import { Mail } from "lucide-react";
import SocialIcons from "@/components/social-icons";

export function Footer() {
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

    return (
        <footer className="mt-auto w-full border-t border-border/60 bg-background/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
                <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">BhavMedia</p>
                    <p className="text-[11px] text-muted-foreground/80">© 2026 BhavMedia. All rights reserved.</p>
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {contactEmail ? (
                        <a
                            href={`mailto:${contactEmail}`}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary transition hover:border-primary/40"
                        >
                            <Mail className="h-4 w-4" />
                            <span className="hidden sm:inline">{contactEmail}</span>
                            <span className="sm:hidden">Email</span>
                        </a>
                    ) : null}

                    <SocialIcons className="text-muted-foreground" />
                </div>
            </div>
        </footer>
    );
}