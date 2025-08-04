import React, { useState } from 'react';
import { Product } from '../types/Product';
import { getSegmentColor } from '../utils/colors';
import { Edit3, Save, X, Palette } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
  onDelete: (ref: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const colors = getSegmentColor(product.SEG);

  const handleSave = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Product, value: string | number | null) => {
    setEditedProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 ${colors.accent} rounded-full`}></div>
          <span className={`${colors.badge} px-3 py-1 rounded-full text-sm font-medium`}>
            {product.SEG}
          </span>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                title="Editar produto"
              >
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(product.REF)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                title="Excluir produto"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                title="Salvar alterações"
              >
                <Save className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cancelar edição"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Artigo</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProduct.ARTIGO}
              onChange={(e) => handleInputChange('ARTIGO', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className={`${colors.text} font-semibold text-lg`}>{product.ARTIGO}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referência</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.REF}
                onChange={(e) => handleInputChange('REF', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800 font-mono text-sm bg-white px-2 py-1 rounded border">
                {product.REF}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desconto</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.DESC}
                onChange={(e) => handleInputChange('DESC', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800 font-semibold">{product.DESC}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Palette className="w-4 h-4 inline mr-1" />
              Cor
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.cor || ''}
                onChange={(e) => handleInputChange('cor', e.target.value || null)}
                placeholder="Ex: 09-PRETO"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">
                {product.cor ? (
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {product.cor}
                  </span>
                ) : (
                  <span className="text-gray-400 italic">Não especificada</span>
                )}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Desc. Corrigido</label>
            {isEditing ? (
              <input
                type="number"
                step="0.1"
                value={editedProduct.DESC_CORRIGIDO || ''}
                onChange={(e) => handleInputChange('DESC_CORRIGIDO', e.target.value ? parseFloat(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">
                {product.DESC_CORRIGIDO !== null ? (
                  <span className="font-semibold">{product.DESC_CORRIGIDO}</span>
                ) : (
                  <span className="text-gray-400 italic">Não definido</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};