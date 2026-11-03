import React, { useState } from 'react';
import { Plus, Check, Search, Sparkles } from 'lucide-react';
import { MenuItem, MenuCategory, CafeInfo } from '../types/cafe';

interface MenuSectionProps {
  items: MenuItem[];
  cafeInfo: CafeInfo;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ items, cafeInfo, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'all', label: 'All Offerings' },
    { key: 'coffee', label: 'Single-Origin & Espresso' },
    { key: 'matcha', label: 'Ceremonial Matcha' },
    { key: 'pastries', label: 'Artisanal Pastries' },
    { key: 'signatures', label: 'Cold Brew & Signatures' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1400);
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#7A8B79] mb-3">
              <span>Curated Selection</span>
              <span aria-hidden="true">·</span>
              <span>Daily Harvests & Bakes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#172B20] tracking-tight">
              Signature Menu
            </h2>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#7E8783] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search beans, matcha, bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] placeholder-[#7E8783] focus:outline-hidden focus:border-[#172B20] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Interactive segmented control per constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 border-b border-[#E8E3DC] no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors font-medium rounded-sm cursor-pointer ${
                  isActive
                    ? 'bg-[#172B20] text-[#FAF8F5]'
                    : 'text-[#525955] hover:text-[#172B20] hover:bg-[#F4EFEA]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-[#525955]">
            <p className="font-serif text-lg mb-2">No menu offerings found</p>
            <p className="text-xs text-[#7E8783]">Try a different search term or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedItemMap[item.id];
              return (
                <div
                  key={item.id}
                  className="group bg-white border border-[#E8E3DC] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#7A8B79]/50 hover:shadow-xs"
                >
                  {/* Card Visual Header */}
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFEA]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold tabular-nums text-[#172B20] rounded-xs shadow-2xs">
                        {item.price} <span className="text-[10px] font-normal uppercase text-[#525955]">{cafeInfo.currency}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6">
                      {/* Quiet metadata line without pills */}
                      {item.origin && (
                        <div className="text-[11px] text-[#7A8B79] font-medium tracking-wider uppercase mb-2">
                          {item.origin}
                        </div>
                      )}

                      <h3 className="text-xl font-serif font-medium text-[#172B20] mb-2 group-hover:text-[#223D2E] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#525955] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Notes separator */}
                      {item.notes && (
                        <div className="pt-3 border-t border-[#F4EFEA] text-[11px] text-[#7E8783] flex items-center gap-1.5">
                          <span className="font-medium text-[#525955]">Taste notes:</span>
                          <span>{item.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-4">
                    <div className="text-xs text-[#7A8B79] font-medium">
                      {item.customizable ? 'Customizable' : 'Standard Serve'}
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#7A8B79] text-white'
                          : 'bg-[#FAF8F5] text-[#172B20] border border-[#E8E3DC] hover:border-[#172B20] hover:bg-[#172B20] hover:text-[#FAF8F5]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quiet footnote on artisanal sourcing */}
        <div className="mt-14 pt-8 border-t border-[#E8E3DC] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#525955] gap-4">
          <p>
            * All espresso drinks feature double shots as standard. Alternative organic oat and almond milks available upon order.
          </p>
          <div className="text-[#172B20] font-medium">
            Beans freshly roasted weekly · Water filtered by reverse osmosis
          </div>
        </div>

      </div>
    </section>
  );
};
