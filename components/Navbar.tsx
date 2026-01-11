
import React from 'react';
import { Category } from '../types';

interface NavbarProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeCategory, setActiveCategory, cartCount, onCartClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 
            className="text-2xl font-black tracking-tighter cursor-pointer" 
            onClick={() => setActiveCategory('Todos')}
          >
            NOVASTYLE
          </h1>
          <div className="hidden md:flex space-x-6">
            {['Zapatillas', 'Camisetas', 'Sudaderas', 'Pantalones'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as Category)}
                className={`text-sm font-medium transition-colors hover:text-black ${
                  activeCategory === cat ? 'text-black font-bold' : 'text-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            onClick={onCartClick}
            className="p-2 text-gray-500 hover:text-black transition-colors relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
