import React, { useState } from 'react';
import { Product } from '../types/Product';
import { X, Plus } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  segments: string[];
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  segments
}) => {
  const [newProduct, setNewProduct] = useState<Product>({
    SEG: '',
    ARTIGO: '',
    REF: '',
    DESC: '0%',
    cor: null,
    DESC_CORRIGIDO: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.SEG && newProduct.ARTIGO && newProduct.REF) {
      onAdd(newProduct);
      setNewProduct({
        SEG: '',
        ARTIGO: '',
        REF: '',
        DESC: '0%',
        cor: null,
        DESC_CORRIGIDO: null
      });
      onClose();
    }
  };

  const handleInputChange = (field: keyof Product, value: string | number | null) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Adicionar Produto</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Segmento *</label>
            <select
              value={newProduct.SEG}
              onChange={(e) => handleInputChange('SEG', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecione um segmento</option>
              {segments.map(seg => (
                <option key={seg} value={seg}>{seg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Artigo *</label>
            <input
              type="text"
              value={newProduct.ARTIGO}
              onChange={(e) => handleInputChange('ARTIGO', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referência *</label>
            <input
              type="text"
              value={newProduct.REF}
              onChange={(e) => handleInputChange('REF', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desconto</label>
            <input
              type="text"
              value={newProduct.DESC}
              onChange={(e) => handleInputChange('DESC', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
            <input
              type="text"
              value={newProduct.cor || ''}
              onChange={(e) => handleInputChange('cor', e.target.value || null)}
              placeholder="Ex: 09-PRETO"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desconto Corrigido</label>
            <input
              type="number"
              step="0.1"
              value={newProduct.DESC_CORRIGIDO || ''}
              onChange={(e) => handleInputChange('DESC_CORRIGIDO', e.target.value ? parseFloat(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};