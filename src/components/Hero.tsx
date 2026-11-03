import React from 'react';
import { ArrowDown, Clock, MapPin, Sparkles } from 'lucide-react';
import { CafeInfo } from '../types/cafe';

interface HeroProps {
  cafeInfo: CafeInfo;
  onExploreMenu: () => void;
  onVisitUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ cafeInfo, onExploreMenu, onVisitUs }) => {
  return (
    <section id="home" className="relative pt-6 pb-20 md:pt-12 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Quiet metadata line (NO pills) */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#7A8B79] mb-5">
              <span>Specialty Coffee</span>
              <span aria-hidden="true">·</span>
              <span>Ceremonial Matcha</span>
              <span aria-hidden="true">·</span>
              <span>House Bakes</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#172B20] leading-[1.08] mb-6 text-balance">
              Your Daily Pause, Perfectly Brewed.
            </h1>

            {/* Subtitle with high legibility */}
            <p className="text-base sm:text-lg text-[#525955] font-light leading-relaxed mb-8 max-w-xl">
              An architectural sanctuary designed for the mindful ritual. Savor single-origin harvests hand-extracted with care, stone-ground Kyoto matcha, and morning brioche baked fresh every dawn.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 mb-12">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#172B20] rounded-sm hover:bg-[#223D2E] transition-all cursor-pointer shadow-xs active:scale-98"
              >
                Explore Our Menu
              </button>
              <button
                onClick={onVisitUs}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#172B20] border border-[#172B20]/25 rounded-sm hover:bg-[#FAF8F5] hover:border-[#172B20] transition-all cursor-pointer"
              >
                Visit Us
              </button>
            </div>

            {/* Clean Proof & Timing Strip */}
            <div className="pt-6 border-t border-[#E8E3DC] grid grid-cols-2 gap-6 text-xs text-[#525955]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#7A8B79] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#1C1E1D]">Opening Hours</span>
                  <span>Daily {cafeInfo.hoursWeekdays}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A8B79] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#1C1E1D]">{cafeInfo.neighborhood}</span>
                  <span>{cafeInfo.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden bg-[#E8ECE6] shadow-sm">
              <img
                src="/src/assets/images/hero_cafe_pour_over_1793720179452.jpg"
                alt="Barista crafting single-origin pour-over coffee at Café"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Subtle natural vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101E17]/50 via-transparent to-transparent pointer-events-none" />

              {/* Quiet photo caption overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-[#FAF8F5]">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#FAF8F5]/80 block font-light">
                    The Pour-Over Method
                  </span>
                  <span className="text-sm font-serif italic text-[#FAF8F5]">
                    Single-Origin Guji Washed Heirloom · 93°C Extraction
                  </span>
                </div>
                <div className="text-right text-[11px] tabular-nums font-mono text-[#FAF8F5]/80">
                  01 / 04
                </div>
              </div>
            </div>

            {/* Architectural accent ornament (hairline frame offset) */}
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-full h-full border border-[#7A8B79]/25 rounded-sm pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};
