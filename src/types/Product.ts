export interface Product {
  SEG: string;
  ARTIGO: string;
  REF: string;
  DESC: string;
  cor: string | null;
  DESC_CORRIGIDO: number | null;
}

export interface ProductFilters {
  seg: string;
  artigo: string;
  ref: string;
}