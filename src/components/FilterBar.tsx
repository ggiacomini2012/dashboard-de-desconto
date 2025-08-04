import React from 'react';
import { ProductFilters } from '../types/Product';
import { getSegmentColor } from '../utils/colors';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  segments: string[];
  articles: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  segments,
  articles
}) => {
  const handleFilterChange = (field: keyof ProductFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      seg: '',
      artigo: '',
      ref: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        <button
          onClick={clearFilters}
          className="ml-auto flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Segmento</label>
          <select
            value={filters.seg}
            onChange={(e) => handleFilterChange('seg', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os segmentos</option>
            {segments.map(seg => {
              const colors = getSegmentColor(seg);
              return (
                <option key={seg} value={seg}>
                  {seg}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Artigo</label>
          <select
            value={filters.artigo}
            onChange={(e) => handleFilterChange('artigo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os artigos</option>
            {articles.map(artigo => (
              <option key={artigo} value={artigo}>
                {artigo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Referência</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.ref}
              onChange={(e) => handleFilterChange('ref', e.target.value)}
              placeholder="Buscar por referência..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};