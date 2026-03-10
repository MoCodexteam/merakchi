import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Star, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import { getFeaturedProducts, getApprovedReviews, getProducts } from '@/lib/dataService';
import type { Product, Review } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [products, approvedReviews, allProducts] = await Promise.all([
        getFeaturedProducts(),
        getApprovedReviews(),
        getProducts(),
      ]);
      setFeaturedProducts(products);
      setReviews(approvedReviews);
      
      // Calculate product counts by category
      const counts: Record<string, number> = {};
      allProducts.forEach((p) => {
        counts[p.category] = (counts[p.category] || 0) + 1;
      });
      setProductCounts(counts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data when window gains focus (user returns from admin)
    const handleFocus = () => {
      fetchData();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const getProductName = (product: Product) => {
    if (i18n.language === 'ar' && product.name_ar) return product.name_ar;
    if (i18n.language === 'fr' && product.name_fr) return product.name_fr;
    return product.name;
  };

  const categories = [
    { name: t('products.livingRoom'), image: '/images/sofa-1.jpg', key: 'Living Room' },
    { name: t('products.bedroom'), image: '/images/bedroom-1.jpg', key: 'Bedroom' },
    { name: t('products.tables'), image: '/images/dining-1.jpg', key: 'Tables' },
    { name: t('products.chairs'), image: '/images/chair-1.jpg', key: 'Chairs' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--wood-dark))]/90 via-[hsl(var(--wood-dark))]/70 to-transparent z-10" />
          <img
            src="/images/hero-bg.jpg"
            alt="Luxury Furniture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 section-padding w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              {t('hero.subtitle')}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="btn-primary gap-2">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[hsl(var(--wood-dark))] gap-2">
                  <Phone className="w-5 h-5" />
                  {t('hero.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[hsl(var(--beige))]">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))] mb-4">
              {t('home.categories')}
            </h2>
            <div className="w-20 h-1 bg-[hsl(var(--wood-medium))] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.key)}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] card-hover"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-dark))]/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/70 text-sm">
                    {productCounts[category.key] || 0} {t('products.title')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="section-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))] mb-4">
                {t('home.featured')}
              </h2>
              <p className="text-muted-foreground">{t('home.featuredDesc')}</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[hsl(var(--wood-dark))] font-medium hover:underline mt-4 md:mt-0"
            >
              {t('home.viewAll')}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-0 shadow-lg card-hover">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={getProductName(product)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[hsl(var(--wood-dark))] text-white text-xs font-medium rounded-full">
                        {t('home.featured')}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <h3 className="text-lg font-bold text-[hsl(var(--wood-dark))] mb-2">
                      {getProductName(product)}
                    </h3>
                    <p className="text-2xl font-bold text-[hsl(var(--accent))] mb-4">
                      {product.price.toLocaleString()} {t('products.currency')}
                    </p>
                    <div className="flex gap-2">
                      <Link to={`/products/${product.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          {t('products.details')}
                        </Button>
                      </Link>
                      <a
                        href={`https://wa.me/213550123456?text=Hello, I am interested in ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="btn-primary px-3">
                          <MessageCircle className="w-5 h-5" />
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

      {/* About Preview Section */}
      <section className="py-20 bg-[hsl(var(--beige))]">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/showroom.jpg"
                  alt="Merakchi Meuble Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[hsl(var(--wood-dark))] rounded-2xl flex items-center justify-center text-white p-6 hidden lg:flex">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">15+</p>
                  <p className="text-sm text-white/80">Years of Excellence</p>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[hsl(var(--wood-medium))] font-medium mb-4 block">
                {t('nav.about')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))] mb-6">
                {t('home.about')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('home.aboutDesc')}
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[hsl(var(--wood-dark))]">500+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[hsl(var(--wood-dark))]">1000+</p>
                  <p className="text-sm text-muted-foreground">Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[hsl(var(--wood-dark))]">15+</p>
                  <p className="text-sm text-muted-foreground">Years</p>
                </div>
              </div>
              <Link to="/about">
                <Button className="btn-primary gap-2">
                  {t('nav.about')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))] mb-4">
              {t('home.testimonials')}
            </h2>
            <div className="w-20 h-1 bg-[hsl(var(--wood-medium))] mx-auto rounded-full" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reviews yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <Card key={review.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? 'fill-[hsl(var(--gold))] text-[hsl(var(--gold))]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{review.comment}"</p>
                    <p className="font-semibold text-[hsl(var(--wood-dark))]">
                      {review.customer_name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[hsl(var(--wood-dark))]">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/70 mb-8">
              Visit our showroom in Ain Beida or contact us for a personalized consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-[hsl(var(--wood-dark))] hover:bg-white/90 gap-2">
                  <Phone className="w-5 h-5" />
                  {t('nav.contact')}
                </Button>
              </Link>
              <a
                href="https://wa.me/213550123456"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[hsl(var(--wood-dark))] gap-2">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
