import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { CafeInfo } from '../types/cafe';

interface NavbarProps {
  cafeInfo: CafeInfo;
  cartCount: number;
  onOpenOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cafeInfo, cartCount, onOpenOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Our Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E3DC] shadow-xs'
            : 'bg-[#FAF8F5] border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#home"
            className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#172B20] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
          >
            {cafeInfo.name}
          </a>

          {/* Zone 2: Desktop clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#525955]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#172B20] transition-colors whitespace-nowrap shrink-0 relative py-1 text-[13.5px] tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Order Now with count) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenOrder}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#172B20] rounded-sm hover:bg-[#223D2E] transition-all whitespace-nowrap shrink-0 active:scale-98 shadow-xs"
              aria-label="View current order"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Now</span>
              {cartCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#FAF8F5] text-[#172B20] text-[10px] font-bold rounded-xs tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#172B20] hover:text-[#223D2E] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#FAF8F5] flex flex-col pt-20 px-8 pb-10">
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-[#E8E3DC]">
            <span className="text-2xl font-serif text-[#172B20]">{cafeInfo.name}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#525955] hover:text-[#172B20]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-xl font-serif text-[#172B20]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#7A8B79] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#7A8B79]" />
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-[#E8E3DC] flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#172B20] rounded-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now {cartCount > 0 ? `(${cartCount})` : ''}</span>
            </button>

            <div className="text-xs text-[#525955] text-center pt-2">
              {cafeInfo.address} · {cafeInfo.neighborhood}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
