import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, ExternalLink, Send, CheckCircle2, Edit3 } from 'lucide-react';
import { CafeInfo } from '../types/cafe';

interface ContactSectionProps {
  cafeInfo: CafeInfo;
  onOpenEditModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  cafeInfo,
  onOpenEditModal,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '10:00 AM',
    guests: '2 Guests',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F4EFEA] border-t border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Edit Details Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#7A8B79] mb-3">
              <span>Location & Hours</span>
              <span aria-hidden="true">·</span>
              <span>Find Sanctuary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#172B20] tracking-tight">
              Visit {cafeInfo.name}
            </h2>
          </div>

          {/* Quick Edit Details for Cafe Customization */}
          <button
            onClick={onOpenEditModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#172B20] bg-white border border-[#E8E3DC] rounded-sm hover:border-[#172B20] transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
            title="Easily customize address, hours, phone and details"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#7A8B79]" />
            <span>Customize Café Info</span>
          </button>
        </div>

        {/* 2-Column Split: Info & Map Placeholder vs Reservation / Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Editable Details & Architectural Map Placeholder */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address */}
              <div className="p-6 bg-white border border-[#E8E3DC] rounded-sm">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#7A8B79] mb-3">
                  <MapPin className="w-4 h-4 text-[#7A8B79]" />
                  <span>Address</span>
                </div>
                <p className="text-sm font-medium text-[#1C1E1D] mb-1">
                  {cafeInfo.address}
                </p>
                <p className="text-xs text-[#525955]">
                  {cafeInfo.neighborhood}, {cafeInfo.city}, {cafeInfo.country}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${cafeInfo.address}, ${cafeInfo.neighborhood}, ${cafeInfo.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#172B20] font-semibold mt-4 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#7A8B79]" />
                </a>
              </div>

              {/* Hours */}
              <div className="p-6 bg-white border border-[#E8E3DC] rounded-sm">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#7A8B79] mb-3">
                  <Clock className="w-4 h-4 text-[#7A8B79]" />
                  <span>Opening Hours</span>
                </div>
                <div className="text-xs text-[#525955] space-y-2">
                  <div>
                    <span className="block font-medium text-[#1C1E1D]">Monday – Friday</span>
                    <span>{cafeInfo.hoursWeekdays}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-[#1C1E1D]">Saturday – Sunday</span>
                    <span>{cafeInfo.hoursWeekends}</span>
                  </div>
                </div>
              </div>

              {/* Phone & Direct */}
              <div className="p-6 bg-white border border-[#E8E3DC] rounded-sm">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#7A8B79] mb-3">
                  <Phone className="w-4 h-4 text-[#7A8B79]" />
                  <span>Phone & Direct</span>
                </div>
                <a
                  href={`tel:${cafeInfo.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-medium text-[#1C1E1D] hover:text-[#172B20] transition-colors block mb-1 tabular-nums"
                >
                  {cafeInfo.phone}
                </a>
                <p className="text-xs text-[#525955]">
                  Orders, bar reservations & bean subscriptions
                </p>
              </div>

              {/* Social & Inquiries */}
              <div className="p-6 bg-white border border-[#E8E3DC] rounded-sm">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#7A8B79] mb-3">
                  <Instagram className="w-4 h-4 text-[#7A8B79]" />
                  <span>Social Media</span>
                </div>
                <p className="text-sm font-medium text-[#1C1E1D] mb-1">
                  {cafeInfo.instagram}
                </p>
                <div className="flex items-center gap-4 pt-3 text-xs text-[#172B20] font-medium">
                  <a href="#contact" className="hover:underline">Instagram</a>
                  <span className="text-[#E8E3DC]">·</span>
                  <a href="#contact" className="hover:underline">Facebook</a>
                  <span className="text-[#E8E3DC]">·</span>
                  <a href="#contact" className="hover:underline">Journal</a>
                </div>
              </div>

            </div>

            {/* Stylized Architectural Map Placeholder */}
            <div className="relative rounded-sm overflow-hidden border border-[#E8E3DC] bg-[#FAF8F5] p-6 min-h-[220px] flex flex-col justify-between">
              {/* Subtle architectural schematic grid lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#172B20_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-widest text-[#7A8B79] block mb-1">
                    Architectural Map Location
                  </span>
                  <h4 className="font-serif text-lg text-[#172B20]">
                    {cafeInfo.address}, {cafeInfo.neighborhood}
                  </h4>
                  <p className="text-xs text-[#525955]">
                    Opposite the Botanical Garden gates · Cairo
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#172B20] text-[#FAF8F5] flex items-center justify-center shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="relative z-10 pt-8 flex items-center justify-between text-xs text-[#525955] border-t border-[#E8E3DC]">
                <div>
                  <span className="font-medium text-[#1C1E1D]">Coordinates: </span>
                  <span className="font-mono text-[11px] text-[#7A8B79]">30.0626° N, 31.2197° E</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${cafeInfo.address}, ${cafeInfo.neighborhood}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#172B20] text-[#FAF8F5] text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:bg-[#223D2E] transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Table Reservation & Direct Message */}
          <div className="lg:col-span-6 bg-white border border-[#E8E3DC] rounded-sm p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#7A8B79] mb-2">
                <span>Sanctuary Table Inquiry</span>
              </div>
              <h3 className="text-2xl font-serif font-medium text-[#172B20] mb-2">
                Reserve a Table or Inquire
              </h3>
              <p className="text-xs text-[#525955] mb-8 leading-relaxed">
                Walk-ins are always welcomed warmly. For quiet work tables, cupping tastings, or small gatherings, please reserve in advance.
              </p>

              {formSubmitted ? (
                <div className="py-12 px-6 text-center bg-[#F4EFEA] rounded-sm border border-[#E8E3DC]">
                  <CheckCircle2 className="w-10 h-10 text-[#7A8B79] mx-auto mb-3" />
                  <h4 className="font-serif text-xl font-medium text-[#172B20] mb-1">
                    Inquiry Received with Warmth
                  </h4>
                  <p className="text-xs text-[#525955] max-w-sm mx-auto mb-6">
                    Thank you, {formData.name}. Our team has received your request for {formData.guests} on {formData.date || 'your selected date'}. We will confirm via {formData.email}.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        date: '',
                        time: '10:00 AM',
                        guests: '2 Guests',
                        note: '',
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#172B20] border border-[#172B20] rounded-sm hover:bg-[#FAF8F5]"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nour El Din"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="nour@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1.5">
                        Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20] transition-colors cursor-pointer"
                      >
                        <option>8:30 AM</option>
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>3:00 PM</option>
                        <option>5:30 PM</option>
                        <option>7:30 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1.5">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20] transition-colors cursor-pointer"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3–4 Guests</option>
                        <option>5–8 Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1.5">
                      Notes or Special Dietary Requests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Quiet booth for reading, oat milk preferred, birthday celebration..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#172B20] rounded-sm hover:bg-[#223D2E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-99"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Reservation Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8E3DC] text-[11px] text-[#7E8783] flex items-center justify-between">
              <span>Responses within 2 business hours</span>
              <span>Direct: {cafeInfo.email}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
