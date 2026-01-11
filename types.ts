
export type Category = 'Zapatillas' | 'Camisetas' | 'Sudaderas' | 'Pantalones' | 'Todos';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  availableSizes: string[];
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardHolder: string;
}

export type CheckoutStep = 'Cart' | 'Shipping' | 'Payment' | 'Success';
