import { useState, useEffect } from 'react';
import type { Purchase, PurchaseFormData, PurchaseItem } from '../../types/purchase';
import type { Contact } from '../../types/contact';
import type { Product } from '../../types/product';

const STORAGE_KEY = 'purchases-management';
const TAX_RATE = 0.21; // 21% IVA

// Datos de ejemplo para empezar
const initialPurchases: Purchase[] = [
  {
    id: '1',
    customerContactId: '1', // Juan Pérez
    items: [
      {
        id: '1',
        productId: '1', // Laptop HP
        quantity: 1,
        unitPrice: 899.99,
        subtotal: 899.99
      },
      {
        id: '2',
        productId: '2', // Mouse Logitech
        quantity: 2,
        unitPrice: 99.99,
        subtotal: 199.98
      }
    ],
    subtotal: 1099.97,
    tax: 230.99,
    total: 1330.96,
    status: 'confirmed',
    notes: 'Compra de equipos para oficina',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    customerContactId: '2', // María García
    items: [
      {
        id: '3',
        productId: '3', // Teclado Corsair
        quantity: 1,
        unitPrice: 159.99,
        subtotal: 159.99
      }
    ],
    subtotal: 159.99,
    tax: 33.60,
    total: 193.59,
    status: 'pending',
    notes: '',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  }
];

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar compras del localStorage al montar el componente
  useEffect(() => {
    const savedPurchases = localStorage.getItem(STORAGE_KEY);
    if (savedPurchases) {
      try {
        const parsedPurchases = JSON.parse(savedPurchases).map((purchase: any) => ({
          ...purchase,
          createdAt: new Date(purchase.createdAt),
          updatedAt: new Date(purchase.updatedAt)
        }));
        setPurchases(parsedPurchases);
      } catch (error) {
        console.error('Error al cargar compras:', error);
        setPurchases(initialPurchases);
      }
    } else {
      setPurchases(initialPurchases);
    }
  }, []);

  // Guardar compras en localStorage cuando cambien
  useEffect(() => {
    if (purchases.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
    }
  }, [purchases]);

  // Filtrar compras basado en el término de búsqueda
  const filteredPurchases = purchases.filter(purchase => {
    const searchLower = searchTerm.toLowerCase();
    return (
      purchase.id.toLowerCase().includes(searchLower) ||
      purchase.total.toString().includes(searchTerm) ||
      purchase.status.toLowerCase().includes(searchLower) ||
      (purchase.notes && purchase.notes.toLowerCase().includes(searchLower))
    );
  });

  const calculatePurchaseAmounts = (items: PurchaseItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const createPurchaseItems = (
    formItems: { productId: string; quantity: string }[],
    products: Product[]
  ): PurchaseItem[] => {
    return formItems
      .filter(item => item.productId && item.quantity)
      .map((item, index) => {
        const product = products.find(p => p.id === item.productId);
        const quantity = parseInt(item.quantity);
        const unitPrice = product?.precio || 0;
        const subtotal = quantity * unitPrice;

        return {
          id: `${Date.now()}-${index}`,
          productId: item.productId,
          quantity,
          unitPrice,
          subtotal
        };
      });
  };

  const createPurchase = (
    purchaseData: PurchaseFormData,
    products: Product[]
  ): Purchase => {
    const items = createPurchaseItems(purchaseData.items, products);
    const { subtotal, tax, total } = calculatePurchaseAmounts(items);

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      customerContactId: purchaseData.customerContactId,
      items,
      subtotal,
      tax,
      total,
      status: 'pending',
      notes: purchaseData.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setPurchases(prev => [newPurchase, ...prev]);
    return newPurchase;
  };

  const updatePurchase = (
    id: string,
    purchaseData: PurchaseFormData,
    products: Product[]
  ): Purchase | null => {
    let updatedPurchase: Purchase | null = null;
    
    setPurchases(prev => prev.map(purchase => {
      if (purchase.id === id) {
        const items = createPurchaseItems(purchaseData.items, products);
        const { subtotal, tax, total } = calculatePurchaseAmounts(items);
        
        updatedPurchase = {
          ...purchase,
          customerContactId: purchaseData.customerContactId,
          items,
          subtotal,
          tax,
          total,
          notes: purchaseData.notes,
          updatedAt: new Date()
        };
        return updatedPurchase;
      }
      return purchase;
    }));

    return updatedPurchase;
  };

  const updatePurchaseStatus = (id: string, status: Purchase['status']): boolean => {
    const purchaseExists = purchases.some(purchase => purchase.id === id);
    if (purchaseExists) {
      setPurchases(prev => prev.map(purchase => 
        purchase.id === id 
          ? { ...purchase, status, updatedAt: new Date() }
          : purchase
      ));
      return true;
    }
    return false;
  };

  const deletePurchase = (id: string): boolean => {
    const purchaseExists = purchases.some(purchase => purchase.id === id);
    if (purchaseExists) {
      setPurchases(prev => prev.filter(purchase => purchase.id !== id));
      return true;
    }
    return false;
  };

  const getPurchaseById = (id: string): Purchase | undefined => {
    return purchases.find(purchase => purchase.id === id);
  };

  const getPurchaseWithDetails = (
    purchase: Purchase,
    contacts: Contact[],
    products: Product[]
  ) => {
    const customer = contacts.find(c => c.id === purchase.customerContactId);
    const itemsWithDetails = purchase.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product
      };
    });

    return {
      ...purchase,
      customer,
      itemsWithDetails
    };
  };

  return {
    purchases: filteredPurchases,
    allPurchases: purchases,
    searchTerm,
    setSearchTerm,
    createPurchase,
    updatePurchase,
    updatePurchaseStatus,
    deletePurchase,
    getPurchaseById,
    getPurchaseWithDetails
  };
};
