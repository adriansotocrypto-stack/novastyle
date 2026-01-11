
import React, { useState, useMemo } from 'react';
import { Category, Product, CartItem, CheckoutStep } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutFlow from './components/CheckoutFlow';
import Hero from './components/Hero';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (checkoutStep) {
    return (
      <CheckoutFlow 
        step={checkoutStep} 
        setStep={setCheckoutStep} 
        cart={cart} 
        total={cartTotal} 
        onComplete={() => setCart([])}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="pt-20">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{activeCategory}</h2>
              <p className="text-gray-500 mt-1">Explora nuestra colección seleccionada</p>
            </div>
            <div className="hidden md:flex space-x-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </div>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        total={cartTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          setCheckoutStep('Cart');
        }}
      />

      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4 text-lg">NovaStyle</h3>
            <p className="text-gray-500">Definiendo el estilo urbano desde 2024. Calidad premium garantizada.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Colecciones</h4>
            <ul className="space-y-2 text-gray-500">
              <li>Zapatillas</li>
              <li>Lanzamientos</li>
              <li>Exclusivos</li>
              <li>Rebajas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2 text-gray-500">
              <li>Envíos</li>
              <li>Devoluciones</li>
              <li>Guía de tallas</li>
              <li>Contacto</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-500 mb-4">Suscríbete para recibir ofertas exclusivas.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-gray-100 px-4 py-2 rounded-l-md w-full focus:outline-none" />
              <button className="bg-black text-white px-4 py-2 rounded-r-md">Unirse</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
