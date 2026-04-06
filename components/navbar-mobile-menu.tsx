"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarMobileMenuProps {
  authButton: React.ReactNode;
}

export function NavbarMobileMenu({ authButton }: NavbarMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md p-2 text-muted-foreground transition hover:text-primary"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-border/60 bg-background/95 px-6 py-5 backdrop-blur">
          <div className="flex flex-col gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            <Link
              href="/"
              className="transition hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="transition hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-1">{authButton}</div>
          </div>
        </div>
      )}
    </div>
  );
}
