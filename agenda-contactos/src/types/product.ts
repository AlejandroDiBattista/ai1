export interface Product {
  id: string;
  codigo: string;
  descripcion: string;
  marca: string;
  precio: number;
  costo: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  codigo: string;
  descripcion: string;
  marca: string;
  precio: string;
  costo: string;
  stock: string;
}

export type ProductModalMode = 'create' | 'edit' | 'view';
