import React, { useState } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { CafeInfo } from '../types/cafe';
import { initialCafeInfo } from '../data/cafeData';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cafeInfo: CafeInfo;
  onSave: (updatedInfo: CafeInfo) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  cafeInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState<CafeInfo>({ ...cafeInfo });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...initialCafeInfo });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#101E17]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E8E3DC] rounded-sm shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#E8E3DC] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-medium text-[#172B20]">
              Customize Café Details
            </h3>
            <p className="text-xs text-[#525955] mt-0.5">
              Easily customize location, operational hours, contact information, and currency.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#525955] hover:text-[#172B20] transition-colors"
            aria-label="Close customization dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Note on brand name */}
          <div className="p-3.5 bg-[#E8ECE6] border border-[#7A8B79]/30 rounded-xs text-xs text-[#172B20] flex items-center justify-between">
            <span>
              <strong>Brand Name:</strong> Fixed to <em>"Café"</em> per specifications.
            </span>
            <span className="font-mono text-[10px] uppercase text-[#7A8B79]">Immutable</span>
          </div>

          {/* Tagline & Subheadline */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B79] border-b border-[#E8E3DC] pb-1.5">
              Editorial Copy
            </h4>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                Headline Tagline
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                Subheadline Introduction
              </label>
              <textarea
                rows={2}
                value={formData.subheadline}
                onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20] resize-none"
              />
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B79] border-b border-[#E8E3DC] pb-1.5">
              Location & Contact Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Neighborhood
                </label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  City & Country
                </label>
                <input
                  type="text"
                  value={`${formData.city}, ${formData.country}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(',');
                    setFormData({
                      ...formData,
                      city: parts[0]?.trim() || formData.city,
                      country: parts[1]?.trim() || formData.country,
                    });
                  }}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours & Currency */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A8B79] border-b border-[#E8E3DC] pb-1.5">
              Operating Schedule & Currency
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Weekday Hours
                </label>
                <input
                  type="text"
                  value={formData.hoursWeekdays}
                  onChange={(e) => setFormData({ ...formData, hoursWeekdays: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Weekend Hours
                </label>
                <input
                  type="text"
                  value={formData.hoursWeekends}
                  onChange={(e) => setFormData({ ...formData, hoursWeekends: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#E8E3DC] flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#525955] hover:text-[#172B20] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#525955] hover:text-[#172B20] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#172B20] rounded-sm hover:bg-[#223D2E] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
