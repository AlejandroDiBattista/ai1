export interface PurchaseItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Purchase {
  id: string;
  customerContactId: string;
  items: PurchaseItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseFormData {
  customerContactId: string;
  items: {
    productId: string;
    quantity: string;
  }[];
  notes: string;
}

export type PurchaseModalMode = 'create' | 'edit' | 'view';
