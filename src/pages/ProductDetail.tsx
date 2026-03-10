import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MessageCircle, Phone, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { getProductById, getApprovedReviews } from '@/lib/dataService';
import type { Product, Review } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProductDetail() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [productData, reviewsData] = await Promise.all([
          getProductById(id),
          getApprovedReviews(),
        ]);
        setProduct(productData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="section-padding py-8">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-padding py-20 text-center">
        <h2 className="text-2xl font-bold text-[hsl(var(--wood-dark))] mb-4">
          Product Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The product you are looking for does not exist.
        </p>
        <Button onClick={() => navigate('/products')} className="btn-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  const whatsappMessage = `Hello Merakchi Meuble, I am interested in: ${product.name}`;
  const whatsappLink = `https://wa.me/213550123456?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="section-padding py-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-muted-foreground hover:text-[hsl(var(--wood-dark))] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
      </div>

      {/* Product Details */}
      <section className="section-padding pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[hsl(var(--beige))]">
              <img
                src={product.images[currentImageIndex]}
                alt={getProductName(product)}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? 'border-[hsl(var(--wood-dark))]'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${getProductName(product)} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))]">
                {getProductName(product)}
              </h1>
            </div>

            <p className="text-3xl font-bold text-[hsl(var(--accent))]">
              {product.price.toLocaleString()} {t('products.currency')}
            </p>

            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold text-[hsl(var(--wood-dark))] mb-2">
                {t('productDetail.description')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {getProductDescription(product)}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--wood-dark))] mb-3">
                  {t('productDetail.specifications')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-[hsl(var(--beige))] rounded-lg p-3"
                    >
                      <p className="text-xs text-muted-foreground">{key}</p>
                      <p className="font-medium text-[hsl(var(--wood-dark))]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="btn-primary flex-1 gap-2">
                    <Phone className="w-5 h-5" />
                    {t('productDetail.contactSeller')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('productDetail.contactSeller')}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <a href="tel:+213550123456">
                      <Button className="w-full btn-primary gap-2 mb-3">
                        <Phone className="w-5 h-5" />
                        +213 550 12 34 56
                      </Button>
                    </a>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full gap-2">
                        <MessageCircle className="w-5 h-5" />
                        {t('productDetail.whatsapp')}
                      </Button>
                    </a>
                  </div>
                </DialogContent>
              </Dialog>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button size="lg" variant="outline" className="w-full gap-2">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding py-16 bg-[hsl(var(--beige))]">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-[hsl(var(--wood-dark))] mb-8">
            {t('productDetail.reviews')}
          </h2>

          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((review) => (
                <Card key={review.id} className="border-0 shadow-md">
                  <CardContent className="p-5">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-[hsl(var(--gold))] text-[hsl(var(--gold))]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      "{review.comment}"
                    </p>
                    <p className="font-semibold text-[hsl(var(--wood-dark))] text-sm">
                      {review.customer_name}
                    </p>
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
