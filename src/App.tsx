/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { InteriorSection } from './components/InteriorSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { CustomizeModal } from './components/CustomizeModal';
import { initialCafeInfo, menuItems, galleryItems } from './data/cafeData';
import { CafeInfo, CartItem, MenuItem } from './types/cafe';

export default function App() {
  const [cafeInfo, setCafeInfo] = useState<CafeInfo>(() => {
    try {
      const saved = localStorage.getItem('cafe_custom_info');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return initialCafeInfo;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cafe_cart_items');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return [];
  });

  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Sync cart items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cafe_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  // Sync cafeInfo to localStorage
  const handleSaveCafeInfo = (updated: CafeInfo) => {
    setCafeInfo(updated);
    try {
      localStorage.setItem('cafe_custom_info', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === menuItem.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [
          ...prev,
          {
            id: `item-${Date.now()}-${menuItem.id}`,
            menuItem,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  const handleClearOrder = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1E1D] flex flex-col font-sans selection:bg-[#172B20] selection:text-[#FAF8F5]">
      {/* Section 1: Minimal sticky navbar */}
      <Navbar
        cafeInfo={cafeInfo}
        cartCount={totalCartCount}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 2: Cinematic hero section */}
        <Hero
          cafeInfo={cafeInfo}
          onExploreMenu={() => scrollToSection('menu')}
          onVisitUs={() => scrollToSection('contact')}
        />

        {/* Section 3: Signature menu */}
        <MenuSection
          items={menuItems}
          cafeInfo={cafeInfo}
          onAddToCart={handleAddToCart}
        />

        {/* Section 4: About section */}
        <AboutSection cafeInfo={cafeInfo} />

        {/* Section 5: Full-width interior photography section */}
        <InteriorSection
          cafeInfo={cafeInfo}
          onExploreInterior={() => scrollToSection('gallery')}
        />

        {/* Section 6: Responsive gallery */}
        <GallerySection items={galleryItems} />

        {/* Section 7: Contact section with editable details */}
        <ContactSection
          cafeInfo={cafeInfo}
          onOpenEditModal={() => setIsCustomizeOpen(true)}
        />
      </main>

      {/* Section 8: Elegant footer */}
      <Footer cafeInfo={cafeInfo} />

      {/* Interactive Order Bag Slide-Over Drawer */}
      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        items={cartItems}
        cafeInfo={cafeInfo}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />

      {/* Live Cafe Customization Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        cafeInfo={cafeInfo}
        onSave={handleSaveCafeInfo}
      />
    </div>
  );
}
