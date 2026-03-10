import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Filter, MessageCircle, Search, X } from 'lucide-react';
import { getProducts, getProductsByCategory } from '@/lib/dataService';
import type { Product } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = ['All', 'Living Room', 'Bedroom', 'Tables', 'Chairs', 'Decoration'];

export default function Products() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedCategory === 'All') {
        data = await getProducts();
      } else {
        data = await getProductsByCategory(selectedCategory);
      }
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // Refresh data when window gains focus (user returns from admin)
  useEffect(() => {
    const handleFocus = () => {
      fetchProducts();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const getProductName = (product: Product) => {
    if (i18n.language === 'ar' && product.name_ar) return product.name_ar;
    if (i18n.language === 'fr' && product.name_fr) return product.name_fr;
    return product.name;
  };

  const getProductDescription = (product: Product) => {
    if (i18n.language === 'ar' && product.description_ar) return product.description_ar;
    if (i18n.language === 'fr' && product.description_fr) return product.description_fr;
    return product.description;
  };

  const filteredProducts = products.filter((product) =>
    getProductName(product).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All':
        return t('products.all');
      case 'Living Room':
        return t('products.livingRoom');
      case 'Bedroom':
        return t('products.bedroom');
      case 'Tables':
        return t('products.tables');
      case 'Chairs':
        return t('products.chairs');
      case 'Decoration':
        return t('products.decoration');
      default:
        return cat;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-20 bg-[hsl(var(--beige))]">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--wood-dark))] mb-4">
              {t('products.title')}
            </h1>
            <p className="text-muted-foreground text-lg">{t('products.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="section-padding">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category Filter - Desktop */}
            <div className="hidden md:flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[hsl(var(--wood-dark))] text-white'
                      : 'bg-secondary hover:bg-[hsl(var(--wood-light))] hover:text-white'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>

            {/* Category Filter - Mobile */}
            <div className="md:hidden">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('products.filter')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {getCategoryLabel(cat)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{t('products.noProducts')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={getProductName(product)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[hsl(var(--wood-dark))] text-white text-xs font-medium rounded-full">
                            {t('home.featured')}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      {product.category}
                    </p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-lg font-bold text-[hsl(var(--wood-dark))] mb-2 line-clamp-1 hover:underline">
                        {getProductName(product)}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {getProductDescription(product)}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-[hsl(var(--accent))]">
                        {product.price.toLocaleString()} {t('products.currency')}
                      </p>
                      <a
                        href={`https://wa.me/213550123456?text=Hello, I am interested in ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" className="btn-primary px-3">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
