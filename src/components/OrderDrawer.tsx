import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { CartItem, CafeInfo } from '../types/cafe';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  cafeInfo: CafeInfo;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  cafeInfo,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
}) => {
  const [pickupTime, setPickupTime] = useState('15–20 mins (Standard)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const generatedOrderNum = `CF-${Math.floor(100 + Math.random() * 900)}`;
    setOrderNumber(generatedOrderNum);
    setOrderConfirmed(true);
  };

  const resetOrderFlow = () => {
    onClearOrder();
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101E17]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E8E3DC] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-[#E8E3DC] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#172B20]" />
              <h3 className="font-serif text-xl font-medium text-[#172B20]">
                Your Order Bag
              </h3>
              {items.length > 0 && (
                <span className="text-xs text-[#7A8B79] font-mono tabular-nums">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#525955] hover:text-[#172B20] transition-colors rounded-xs"
              aria-label="Close order drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmed ? (
              /* Order Confirmation Screen */
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#E8ECE6] text-[#172B20] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#172B20]" />
                </div>
                <div className="text-[11px] font-medium uppercase tracking-widest text-[#7A8B79] mb-1">
                  Order Confirmed
                </div>
                <h4 className="font-serif text-2xl font-medium text-[#172B20] mb-2">
                  Thank You, {customerName || 'Friend'}!
                </h4>
                <p className="text-xs text-[#525955] max-w-xs mb-6">
                  Your order has been sent to our barista bar at {cafeInfo.name} ({cafeInfo.neighborhood}).
                </p>

                {/* Receipt Card */}
                <div className="w-full bg-white border border-[#E8E3DC] rounded-sm p-5 text-left mb-6 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E8E3DC] text-xs">
                    <span className="text-[#525955]">Order Reference:</span>
                    <span className="font-mono font-bold text-[#172B20]">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#525955]">Pickup Estimate:</span>
                    <span className="font-medium text-[#172B20]">{pickupTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#525955]">Total Amount:</span>
                    <span className="font-bold text-[#172B20] tabular-nums">
                      {subtotal} {cafeInfo.currency}
                    </span>
                  </div>
                  <div className="pt-2 text-[11px] text-[#7E8783] italic border-t border-[#F4EFEA]">
                    Payment upon counter collection (Cash or Card accepted).
                  </div>
                </div>

                <button
                  onClick={resetOrderFlow}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#172B20] rounded-sm hover:bg-[#223D2E] transition-all cursor-pointer"
                >
                  Done & Clear Order
                </button>
              </div>
            ) : items.length === 0 ? (
              /* Empty Bag State */
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#7E8783] mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-medium text-[#172B20] mb-2">
                  Your bag is empty
                </h4>
                <p className="text-xs text-[#525955] max-w-xs mb-6 leading-relaxed">
                  Explore our single-origin coffees, ceremonial Uji matcha, and morning viennoiserie to begin your order.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#172B20] border border-[#172B20] rounded-sm hover:bg-[#FAF8F5] transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* Items List */
              <>
                <div className="space-y-4">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="bg-white border border-[#E8E3DC] rounded-sm p-4 flex gap-3.5"
                    >
                      <img
                        src={cartItem.menuItem.image}
                        alt={cartItem.menuItem.name}
                        className="w-16 h-16 object-cover rounded-xs bg-[#F4EFEA] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif font-medium text-[#172B20] text-sm leading-snug truncate">
                            {cartItem.menuItem.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(cartItem.id)}
                            className="text-[#7E8783] hover:text-rose-700 p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#7A8B79]">
                          {cartItem.menuItem.price} {cafeInfo.currency} each
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#E8E3DC] rounded-xs bg-[#FAF8F5]">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, -1)}
                              className="px-2 py-0.5 text-[#525955] hover:text-[#172B20] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-medium text-[#1C1E1D] tabular-nums">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, 1)}
                              className="px-2 py-0.5 text-[#525955] hover:text-[#172B20] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-[#172B20] tabular-nums">
                            {cartItem.menuItem.price * cartItem.quantity} {cafeInfo.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pickup Time Selection */}
                <div className="pt-4 border-t border-[#E8E3DC]">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7A8B79]" />
                    <span>Pickup Estimation</span>
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                  >
                    <option>15–20 mins (Standard)</option>
                    <option>30 mins</option>
                    <option>45 mins</option>
                    <option>Later Today (Specify at pickup)</option>
                  </select>
                </div>

                {/* Customer Information Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Layla Mansour"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#525955] mb-1">
                      Contact Phone (for pickup SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+20 10 1234 5678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DC] rounded-sm text-[#1C1E1D] focus:outline-hidden focus:border-[#172B20]"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer (Summary & Action) */}
          {!orderConfirmed && items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E3DC] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#525955]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1C1E1D] tabular-nums">
                    {subtotal} {cafeInfo.currency}
                  </span>
                </div>
                <div className="flex justify-between text-[#7E8783] text-[11px]">
                  <span>Counter Pickup</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#172B20] pt-2 border-t border-[#F4EFEA]">
                  <span>Total Due at Counter</span>
                  <span className="tabular-nums font-bold">
                    {subtotal} {cafeInfo.currency}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] bg-[#172B20] rounded-sm hover:bg-[#223D2E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-99"
              >
                <span>Confirm Pickup Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-center text-[#7E8783]">
                Pay with cash or card upon arrival at {cafeInfo.name}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
