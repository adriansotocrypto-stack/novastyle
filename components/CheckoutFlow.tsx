
import React, { useState } from 'react';
import { CartItem, CheckoutStep, ShippingInfo, PaymentInfo } from '../types';

interface CheckoutFlowProps {
  step: CheckoutStep;
  setStep: (step: CheckoutStep | null) => void;
  cart: CartItem[];
  total: number;
  onComplete: () => void;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ step, setStep, cart, total, onComplete }) => {
  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: '', email: '', address: '', city: '', zipCode: ''
  });
  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '', expiry: '', cvv: '', cardHolder: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('Payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setStep('Success');
      onComplete();
    }, 2000);
  };

  if (step === 'Success') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">¡Gracias por tu compra!</h1>
          <p className="text-gray-500">Tu pedido ha sido procesado con éxito. Recibirás un email de confirmación en unos minutos.</p>
          <div className="pt-6">
            <button 
              onClick={() => setStep(null)}
              className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-lg"
            >
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tighter">NOVASTYLE</h1>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span className={step === 'Cart' ? 'text-black' : ''}>Carrito</span>
            <span>/</span>
            <span className={step === 'Shipping' ? 'text-black' : ''}>Envío</span>
            <span>/</span>
            <span className={step === 'Payment' ? 'text-black' : ''}>Pago</span>
          </div>
          <button onClick={() => setStep(null)} className="text-sm font-semibold text-gray-500 hover:text-black">
            Cerrar
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          {step === 'Cart' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Revisa tu carrito</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="p-6 flex space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-bold">{item.name}</h4>
                          <span className="font-bold">{item.price.toFixed(2)}€</span>
                        </div>
                        <p className="text-sm text-gray-500">Talla: {item.selectedSize} | Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button 
                  onClick={() => setStep(null)}
                  className="px-6 py-3 font-semibold text-gray-600 hover:text-black"
                >
                  Seguir comprando
                </button>
                <button 
                  onClick={() => setStep('Shipping')}
                  className="px-10 py-3 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all"
                >
                  Continuar al envío
                </button>
              </div>
            </div>
          )}

          {step === 'Shipping' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Información de envío</h2>
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={shipping.fullName}
                      onChange={e => setShipping({...shipping, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={shipping.email}
                      onChange={e => setShipping({...shipping, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Dirección</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                    value={shipping.address}
                    onChange={e => setShipping({...shipping, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Ciudad</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={shipping.city}
                      onChange={e => setShipping({...shipping, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Código Postal</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={shipping.zipCode}
                      onChange={e => setShipping({...shipping, zipCode: e.target.value})}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all"
                  >
                    Ir al pago
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'Payment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Método de pago</h2>
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                <div className="relative h-48 w-full max-w-sm mx-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white shadow-xl mb-8 flex flex-col justify-between overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-8 bg-amber-400/80 rounded-md" />
                    <span className="text-xl font-black italic tracking-tighter">VISA</span>
                  </div>
                  <div>
                    <div className="text-lg tracking-[0.2em] font-mono mb-2">
                      {payment.cardNumber || '**** **** **** ****'}
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                      <div>
                        <span className="text-gray-500 block">Titular</span>
                        <span>{payment.cardHolder || 'NOMBRE APELLIDO'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 block">Expira</span>
                        <span>{payment.expiry || 'MM/AA'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Nombre en la tarjeta</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all uppercase"
                      value={payment.cardHolder}
                      onChange={e => setPayment({...payment, cardHolder: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Número de tarjeta</label>
                    <input 
                      required
                      type="text" 
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength={19}
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                      value={payment.cardNumber}
                      onChange={e => {
                         const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                         setPayment({...payment, cardNumber: val});
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Vencimiento</label>
                      <input 
                        required
                        type="text" 
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                        value={payment.expiry}
                        onChange={e => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
                          setPayment({...payment, expiry: val});
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">CVV</label>
                      <input 
                        required
                        type="password" 
                        placeholder="***"
                        maxLength={3}
                        className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 focus:ring-2 focus:ring-black outline-none transition-all"
                        value={payment.cvv}
                        onChange={e => setPayment({...payment, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-4 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <span>Pagar {total.toFixed(2)}€</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Resumen del pedido</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600 font-bold">GRATIS</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-black">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>

            {step !== 'Cart' && (
              <div className="space-y-6 pt-6 border-t border-gray-100">
                {shipping.fullName && (
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Entregar a:</h4>
                    <p className="text-sm font-semibold">{shipping.fullName}</p>
                    <p className="text-xs text-gray-500">{shipping.address}, {shipping.city}</p>
                  </div>
                )}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                   <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                     </svg>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold uppercase text-gray-400">Pago Seguro</p>
                     <p className="text-[10px] text-gray-500">Encriptación SSL de 256 bits</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutFlow;
