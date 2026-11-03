import React from 'react';
import { CafeInfo } from '../types/cafe';

interface InteriorSectionProps {
  cafeInfo: CafeInfo;
  onExploreInterior: () => void;
}

export const InteriorSection: React.FC<InteriorSectionProps> = ({ cafeInfo, onExploreInterior }) => {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-[#172B20] text-[#FAF8F5]">
      {/* Background panoramic interior photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/interior_sanctuary_wide_1793720181724.jpg"
          alt="Interior architectural seating and natural sunlight at Café"
          className="w-full h-full object-cover opacity-35 scale-102 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101E17] via-[#172B20]/60 to-[#101E17]/80" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A3B19E] mb-6">
          <span>The Physical Sanctuary</span>
          <span aria-hidden="true">·</span>
          <span>Designed by Studio Oakhaven</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-[#FAF8F5] leading-[1.08] mb-8 text-balance">
          More Than Just Coffee.
        </h2>

        <p className="text-base sm:text-lg text-[#E4EAE2]/90 font-light max-w-2xl leading-relaxed mb-10">
          A physical manifestation of slower living. Deep forest velvet nooks, hand-cast terrazzo, soft directional morning light, and curated ambient acoustics that welcome you to read, connect, or simply pause.
        </p>

        {/* Architectural Material Badges (clean unboxed text per constitution) */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#FAF8F5]/80 font-light tracking-wide pb-10 border-b border-[#FAF8F5]/15 max-w-xl">
          <span>Lime-Washed Plaster</span>
          <span aria-hidden="true" className="text-[#A3B19E]">·</span>
          <span>Fluted White Oak</span>
          <span aria-hidden="true" className="text-[#A3B19E]">·</span>
          <span>Acoustic Wool Baffles</span>
          <span aria-hidden="true" className="text-[#A3B19E]">·</span>
          <span>Living Ficus Canopy</span>
        </div>

        {/* Secondary interaction */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={onExploreInterior}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#172B20] bg-[#FAF8F5] rounded-sm hover:bg-white transition-all shadow-xs cursor-pointer active:scale-98"
          >
            Explore the Sanctuary
          </button>
        </div>

      </div>
    </section>
  );
};
