
import React, { useState } from 'react';
import { Product } from '../types';
import { getFashionAdvice } from '../geminiService';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const handleGetAdvice = async () => {
    setLoadingAdvice(true);
    const text = await getFashionAdvice(product.name, product.category);
    setAdvice(text);
    setLoadingAdvice(false);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
          {product.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mb-4">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Talla</label>
          <div className="flex flex-wrap gap-2">
            {product.availableSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-9 h-9 flex items-center justify-center text-xs font-semibold rounded border transition-all ${
                  selectedSize === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-200 hover:border-gray-400 text-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold">{product.price.toFixed(2)}€</span>
            <button 
              onClick={handleGetAdvice}
              className="text-[10px] font-bold uppercase text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.674a1 1 0 00.922-.617l2.108-4.742A1 1 0 0016.446 10H13V4a1 1 0 00-1.789-.606l-5.333 7.111a1 1 0 00.122 1.372V14a1 1 0 001 1h2.663v2z" />
              </svg>
              <span>{loadingAdvice ? 'Pensando...' : 'Pedir Consejo AI'}</span>
            </button>
          </div>

          {advice && (
            <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs italic text-indigo-900 leading-relaxed relative">
              <button 
                onClick={() => setAdvice(null)}
                className="absolute -top-1 -right-1 bg-white rounded-full shadow-sm p-0.5 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              "{advice}"
            </div>
          )}

          <button
            disabled={!selectedSize}
            onClick={() => onAddToCart(product, selectedSize)}
            className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
              selectedSize 
                ? 'bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/10 active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
