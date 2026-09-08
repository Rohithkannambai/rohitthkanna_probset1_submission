import React from 'react';
import { TING_TING_BRAND, FOOTER_CONTENT } from '../data/tingTingData';

interface FooterProps {
  onOverlaySelect?: (overlay: 'about' | 'policy' | 'communityGuidelines') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOverlaySelect }) => {
  return (
    <footer
      id="main-footer"
      className="w-full bg-[#D8C6B3] border-t border-[#C7B5A0] text-[#342820] mt-auto"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 sm:py-16 flex flex-col gap-10 sm:gap-12">
        {/* 3 Columns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Ting Ting Logo"
                referrerPolicy="no-referrer"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg object-contain"
                src={TING_TING_BRAND.logoUrl}
              />
              <span className="text-base sm:text-lg tracking-wide uppercase text-[#342820] font-bold">
                {FOOTER_CONTENT.brandName}
              </span>
            </div>
            <p className="text-sm text-[#4A3B31] max-w-sm leading-relaxed">
              {FOOTER_CONTENT.tagline}
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#7A5A43]">
              Company
            </h3>
            <nav className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={() => onOverlaySelect?.('about')}
                className="text-left text-sm text-[#4A3B31] hover:text-[#342820] transition-colors cursor-pointer select-none"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => onOverlaySelect?.('policy')}
                className="text-left text-sm text-[#4A3B31] hover:text-[#342820] transition-colors cursor-pointer select-none"
              >
                Policy
              </button>
              <button
                type="button"
                onClick={() => onOverlaySelect?.('communityGuidelines')}
                className="text-left text-sm text-[#4A3B31] hover:text-[#342820] transition-colors cursor-pointer select-none"
              >
                Community Guidelines
              </button>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-[#7A5A43]">
              Contact
            </h3>
            <div className="flex flex-col space-y-3 text-sm text-[#4A3B31]">
              {FOOTER_CONTENT.contacts.map((contact) => (
                <div key={contact.label}>
                  <p className="font-semibold text-[#342820] mb-0.5">{contact.label}</p>
                  <p className="font-mono text-xs">{contact.phone}</p>
                  <p className="hover:underline cursor-pointer">{contact.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[#C7B5A0]"></div>

        {/* Global Offices Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-widest font-bold text-[#7A5A43]">
            Global Offices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#4A3B31]">
            {FOOTER_CONTENT.globalOffices.map((group) => (
              <div key={group.region}>
                <span className="text-xs uppercase font-bold text-[#342820] block mb-1">
                  {group.region}
                </span>
                {group.offices.map((office) => (
                  <p key={office}>{office}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-4 border-t border-[#C7B5A0]/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#6A5A4E]">
            {FOOTER_CONTENT.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
