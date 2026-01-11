
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Nova Pro Max',
    price: 159.99,
    category: 'Zapatillas',
    image: 'https://picsum.photos/seed/shoes1/600/600',
    description: 'Zapatillas de alto rendimiento con tecnología de amortiguación avanzada para el día a día.',
    availableSizes: ['40', '41', '42', '43', '44', '45']
  },
  {
    id: '2',
    name: 'Essential Cotton Tee',
    price: 29.99,
    category: 'Camisetas',
    image: 'https://picsum.photos/seed/shirt1/600/600',
    description: 'Camiseta de algodón 100% orgánico, corte regular y tacto suave.',
    availableSizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Urban Oversized Hoodie',
    price: 54.99,
    category: 'Sudaderas',
    image: 'https://picsum.photos/seed/hoodie1/600/600',
    description: 'Sudadera con capucha estilo urbano, perfecta para combinar con cualquier look casual.',
    availableSizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'Slim Fit Chinos',
    price: 45.00,
    category: 'Pantalones',
    image: 'https://picsum.photos/seed/pants1/600/600',
    description: 'Pantalones chinos de corte moderno, elásticos y confortables.',
    availableSizes: ['38', '40', '42', '44']
  },
  {
    id: '5',
    name: 'Retro Runner X',
    price: 120.00,
    category: 'Zapatillas',
    image: 'https://picsum.photos/seed/shoes2/600/600',
    description: 'Diseño retro inspirado en los clásicos del atletismo de los años 90.',
    availableSizes: ['39', '40', '41', '42', '43']
  },
  {
    id: '6',
    name: 'Graphic Art Tee',
    price: 35.00,
    category: 'Camisetas',
    image: 'https://picsum.photos/seed/shirt2/600/600',
    description: 'Camiseta con diseño gráfico exclusivo de edición limitada.',
    availableSizes: ['S', 'M', 'L']
  },
  {
    id: '7',
    name: 'Premium Tech Joggers',
    price: 65.00,
    category: 'Pantalones',
    image: 'https://picsum.photos/seed/pants2/600/600',
    description: 'Joggers técnicos con bolsillos sellados y tejido repelente al agua.',
    availableSizes: ['M', 'L', 'XL']
  },
  {
    id: '8',
    name: 'Heritage Fleece Pullover',
    price: 70.00,
    category: 'Sudaderas',
    image: 'https://picsum.photos/seed/hoodie2/600/600',
    description: 'Pullover de forro polar térmico para máxima calidez sin sacrificar el estilo.',
    availableSizes: ['S', 'M', 'L', 'XL']
  }
];

export const CATEGORIES = ['Todos', 'Zapatillas', 'Camisetas', 'Sudaderas', 'Pantalones'];
