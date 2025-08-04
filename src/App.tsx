import React from 'react';
import { useState, useMemo } from 'react';
import { Product, ProductFilters } from './types/Product';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProductCard } from './components/ProductCard';
import { FilterBar } from './components/FilterBar';
import { StatsCard } from './components/StatsCard';
import { AddProductModal } from './components/AddProductModal';
import { Package, Plus, Download, Upload, BarChart3 } from 'lucide-react';
import productsData from './data/products_enhanced.json';

function App() {
  const [products, setProducts] = useLocalStorage('products', productsData as Product[]);
  const [filters, setFilters] = useState<ProductFilters>({
    seg: '',
    artigo: '',
    ref: ''
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Dados únicos para filtros
  const segments = useMemo(() => 
    [...new Set(products.map(p => p.SEG))].sort(), 
    [products]
  );
  
  const articles = useMemo(() => 
    [...new Set(products.map(p => p.ARTIGO))].sort(), 
    [products]
  );

  // Produtos filtrados
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSeg = !filters.seg || product.SEG === filters.seg;
      const matchesArtigo = !filters.artigo || product.ARTIGO === filters.artigo;
      const matchesRef = !filters.ref || product.REF.toLowerCase().includes(filters.ref.toLowerCase());
      
      return matchesSeg && matchesArtigo && matchesRef;
    });
  }, [products, filters]);

  // Estatísticas por segmento
  const segmentStats = useMemo(() => {
    const stats = segments.map(segment => {
      const count = products.filter(p => p.SEG === segment).length;
      const percentage = (count / products.length) * 100;
      return { segment, count, percentage };
    });
    return stats.sort((a, b) => b.count - a.count);
  }, [products, segments]);

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => p.REF === updatedProduct.REF ? updatedProduct : p)
    );
  };

  const handleDeleteProduct = (ref: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.REF !== ref));
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products_export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    if (window.confirm('Tem certeza que deseja restaurar os dados originais? Todas as alterações serão perdidas.')) {
      setProducts(productsData as Product[]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard de Produtos</h1>
                <p className="text-gray-600">Gerencie seu catálogo de produtos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button
                onClick={resetData}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Restaurar
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Novo Produto
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Estatísticas */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Estatísticas por Segmento</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {segmentStats.map(stat => (
              <StatsCard
                key={stat.segment}
                segment={stat.segment}
                count={stat.count}
                percentage={stat.percentage}
              />
            ))}
          </div>
        </div>

        {/* Filtros */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          segments={segments}
          articles={articles}
        />

        {/* Resultados */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Produtos ({filteredProducts.length})
            </h2>
            {filters.seg || filters.artigo || filters.ref ? (
              <p className="text-sm text-gray-600">
                Mostrando {filteredProducts.length} de {products.length} produtos
              </p>
            ) : null}
          </div>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.REF}
                product={product}
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou adicione um novo produto.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar Produto
            </button>
          </div>
        )}
      </main>

      {/* Modal de Adicionar Produto */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
        segments={segments}
      />
    </div>
  );
}

export default App;
