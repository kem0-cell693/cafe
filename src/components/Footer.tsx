import React, { useState } from 'react';
import { ArrowUp, ArrowRight, Check } from 'lucide-react';
import { CafeInfo } from '../types/cafe';

interface FooterProps {
  cafeInfo: CafeInfo;
}

export const Footer: React.FC<FooterProps> = ({ cafeInfo }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101E17] text-[#FAF8F5] pt-20 pb-12 border-t border-[#172B20]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#FAF8F5]/10">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#home"
                className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-[#FAF8F5] block mb-4"
              >
                {cafeInfo.name}
              </a>
              <p className="text-xs sm:text-sm text-[#A3B19E] font-light leading-relaxed max-w-sm mb-6">
                Your daily pause, perfectly brewed. Sourcing exceptional single-origin coffees, ceremonial matcha, and dawn bakes in an architectural sanctuary.
              </p>
            </div>

            <div className="text-xs text-[#E4EAE2]/70 space-y-1">
              <p>{cafeInfo.address}, {cafeInfo.neighborhood}</p>
              <p>{cafeInfo.city}, {cafeInfo.country}</p>
              <p className="pt-2 text-[#FAF8F5] font-medium">{cafeInfo.phone}</p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#7A8B79] mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-xs text-[#FAF8F5]/80">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Signature Menu</a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">Our Story & Craft</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Visual Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Visit & Reservations</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Seasonal Journal */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#7A8B79] mb-4">
                Seasonal Journal & Releases
              </h4>
              <p className="text-xs text-[#A3B19E] font-light leading-relaxed mb-4">
                Join our quiet circle for announcements of limited micro-lot beans, Japanese matcha arrivals, and seasonal tastings.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#FAF8F5] bg-[#172B20] py-2.5 px-3 rounded-xs border border-[#7A8B79]/40">
                  <Check className="w-4 h-4 text-[#7A8B79]" />
                  <span>Thank you. You are on the seasonal journal.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs bg-[#172B20]/60 border border-[#FAF8F5]/15 rounded-xs text-[#FAF8F5] placeholder-[#7A8B79] focus:outline-hidden focus:border-[#FAF8F5]/40"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#FAF8F5] text-[#172B20] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-white transition-colors shrink-0 flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe to seasonal journal"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 text-xs text-[#A3B19E]">
              <span className="text-[#FAF8F5] font-medium block mb-1">Hours of Sanctuary:</span>
              <span>Mon – Fri: {cafeInfo.hoursWeekdays} · Sat – Sun: {cafeInfo.hoursWeekends}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3B19E]/70 gap-4">
          <p>© {new Date().getFullYear()} {cafeInfo.name}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Specialty Coffee & Bakes</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
