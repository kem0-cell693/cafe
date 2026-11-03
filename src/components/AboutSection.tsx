import React from 'react';
import { Compass, Feather, Flame, HeartHandshake } from 'lucide-react';
import { CafeInfo } from '../types/cafe';

interface AboutSectionProps {
  cafeInfo: CafeInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ cafeInfo }) => {
  return (
    <section id="story" className="py-20 md:py-28 bg-[#F4EFEA] border-t border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Chapter Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#7A8B79] mb-3">
            <span>Our Story</span>
            <span aria-hidden="true">·</span>
            <span>The Art of Lingering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#172B20] tracking-tight leading-tight mb-6">
            A quiet pause in the center of the day.
          </h2>
          <p className="text-base sm:text-lg text-[#525955] font-light leading-relaxed">
            {cafeInfo.name} was established with a singular conviction: that in a world constantly accelerating, the ritual of coffee should be an anchor of stillness. We conceived {cafeInfo.name} not merely as a coffee house, but as a sanctuary where craft, architecture, and quiet human warmth converge.
          </p>
        </div>

        {/* 2-Column Story Grid with Photography & Editorial Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-[#E8ECE6] shadow-sm">
              <img
                src="/src/assets/images/gallery_espresso_machine_1793720181542.jpg"
                alt="Bespoke espresso bar and craft at Café"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Quote callout box without thick left border */}
            <div className="mt-6 p-6 bg-white border border-[#E8E3DC] rounded-sm">
              <p className="text-sm font-serif italic text-[#172B20] leading-relaxed mb-3">
                “Every extraction is a dialogue between the grower's soil, the season's sun, and the barista's quiet hand.”
              </p>
              <span className="text-[11px] font-medium tracking-wider uppercase text-[#7A8B79]">
                Head Roaster & Founder · {cafeInfo.name}
              </span>
            </div>
          </div>

          {/* Right Column: 3 Editorial Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            <div className="border-b border-[#E8E3DC] pb-8">
              <div className="text-xs font-mono text-[#7A8B79] mb-2 tabular-nums">
                01.
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#172B20] mb-3">
                Direct-Trade Harvests & Ethical Integrity
              </h3>
              <p className="text-sm text-[#525955] leading-relaxed">
                We work directly with smallholder coffee families in the high-elevation slopes of Guji, Huila, and Tarrazú. By paying well above fair-trade thresholds, we support regenerative agricultural practices, preserving rare heirloom varietals that yield remarkable clarity in the cup.
              </p>
            </div>

            <div className="border-b border-[#E8E3DC] pb-8">
              <div className="text-xs font-mono text-[#7A8B79] mb-2 tabular-nums">
                02.
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#172B20] mb-3">
                The Architecture of Mindful Stillness
              </h3>
              <p className="text-sm text-[#525955] leading-relaxed">
                Our space is formed from natural lime-washed ivory plaster, acoustic felt ceilings, warm aged walnut joinery, and deep forest green velvet. Designed to dampen urban noise, {cafeInfo.name} welcomes you whether you bring a notebook, a companion, or an appetite for solitude.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-[#7A8B79] mb-2 tabular-nums">
                03.
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#172B20] mb-3">
                Dawn Viennoiserie & Wild Sourdough
              </h3>
              <p className="text-sm text-[#525955] leading-relaxed">
                Before first light, our baker kneads slow-fermented wild sourdough and laminates cultured French butter dough into eighty-one crisp layers. Cardamom, roasted Bronte pistachios, and Sinai wildflower honeys perfume the morning air.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
