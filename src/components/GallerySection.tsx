import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { GalleryItem } from '../types/cafe';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filters = ['All', 'Atmosphere', 'Craft', 'Pastry', 'Brews'];

  const filteredItems = selectedFilter === 'All'
    ? items
    : items.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#7A8B79] mb-3">
              <span>Visual Impressions</span>
              <span aria-hidden="true">·</span>
              <span>Moments Captured</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#172B20] tracking-tight">
              Life at Café
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {filters.map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors font-medium rounded-sm cursor-pointer ${
                    isActive
                      ? 'bg-[#172B20] text-[#FAF8F5]'
                      : 'text-[#525955] hover:text-[#172B20] hover:bg-[#F4EFEA]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item, index) => {
            const isWide = index === 0 && selectedFilter === 'All';
            const colSpan = isWide ? 'md:col-span-8' : 'md:col-span-4';

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className={`${colSpan} group relative rounded-sm overflow-hidden bg-[#F4EFEA] border border-[#E8E3DC] cursor-pointer aspect-[4/3] md:aspect-auto ${
                  isWide ? 'md:min-h-[420px]' : 'md:min-h-[300px]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                
                {/* Natural dark gradient scrim on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101E17]/80 via-[#101E17]/20 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Info Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-[#FAF8F5] opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#A3B19E] bg-[#101E17]/60 px-2 py-0.5 rounded-xs">
                      {item.category}
                    </span>
                    <span className="p-1.5 bg-[#FAF8F5]/20 backdrop-blur-xs rounded-xs">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg md:text-xl font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FAF8F5]/80 font-light line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div
            className="fixed inset-0 z-50 bg-[#101E17]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveLightboxItem(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#FAF8F5] rounded-sm overflow-hidden border border-[#E8E3DC] shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-[#FAF8F5]/80 backdrop-blur-xs text-[#172B20] hover:text-black rounded-xs cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] bg-[#101E17]">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 sm:p-8 bg-white border-t border-[#E8E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#7A8B79] font-medium uppercase tracking-wider mb-1">
                    {activeLightboxItem.category} · Café Archive
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#172B20]">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs text-[#525955] mt-1 max-w-xl">
                    {activeLightboxItem.caption}
                  </p>
                </div>

                <button
                  onClick={() => setActiveLightboxItem(null)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#172B20] border border-[#E8E3DC] rounded-sm hover:bg-[#FAF8F5] transition-colors shrink-0"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
