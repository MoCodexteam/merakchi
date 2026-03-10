import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Package,
  Star,
  MessageSquare,
  TrendingUp,
  Eye,
  ShoppingBag,
} from 'lucide-react';
import { getAnalytics, getProducts, getReviews, getMessages } from '@/lib/dataService';
import type { Product, Review, Message } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Analytics {
  totalProducts: number;
  totalReviews: number;
  totalMessages: number;
  featuredProducts: number;
  unreadMessages: number;
  pendingReviews: number;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, products, reviews, messages] = await Promise.all([
          getAnalytics(),
          getProducts(),
          getReviews(),
          getMessages(),
        ]);
        setAnalytics(analyticsData as Analytics);
        setRecentProducts(products.slice(0, 5));
        setRecentReviews(reviews.slice(0, 3));
        setRecentMessages(messages.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: t('admin.dashboard.stats.products'),
      value: analytics?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
    {
      title: t('admin.dashboard.stats.reviews'),
      value: analytics?.totalReviews || 0,
      icon: Star,
      color: 'bg-yellow-500',
      link: '/admin/reviews',
    },
    {
      title: t('admin.dashboard.stats.messages'),
      value: analytics?.totalMessages || 0,
      icon: MessageSquare,
      color: 'bg-green-500',
      link: '/admin/messages',
    },
    {
      title: t('admin.dashboard.stats.featured'),
      value: analytics?.featuredProducts || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      link: '/admin/products',
    },
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--wood-dark))]">
          {t('admin.dashboard.title')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('admin.dashboard.welcome')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.link}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-[hsl(var(--wood-dark))]">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Products */}
        <Card className="border-0 shadow-md lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Products</CardTitle>
            <Link to="/admin/products">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-[hsl(var(--beige))] hover:bg-[hsl(var(--wood-light))]/10 transition-colors"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[hsl(var(--wood-dark))] truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.category} • {product.price.toLocaleString()} DZD
                    </p>
                  </div>
                  <Link to={`/products/${product.id}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/products">
              <Button variant="outline" className="w-full justify-start gap-2">
                <ShoppingBag className="w-4 h-4" />
                Manage Products
              </Button>
            </Link>
            <Link to="/admin/reviews">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Star className="w-4 h-4" />
                Manage Reviews
              </Button>
            </Link>
            <Link to="/admin/messages">
              <Button variant="outline" className="w-full justify-start gap-2">
                <MessageSquare className="w-4 h-4" />
                View Messages
              </Button>
            </Link>
            <Link to="/admin/media">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Eye className="w-4 h-4" />
                Media Library
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Messages</CardTitle>
            <Link to="/admin/messages">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentMessages.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                {t('admin.messages.noMessages')}
              </p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.read ? 'bg-[hsl(var(--beige))]' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-[hsl(var(--wood-dark))]">
                        {message.name}
                      </p>
                      {!message.read && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {message.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Reviews</CardTitle>
            <Link to="/admin/reviews">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className={`p-4 rounded-lg ${
                    review.approved ? 'bg-[hsl(var(--beige))]' : 'bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-[hsl(var(--wood-dark))]">
                      {review.customer_name}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      {!review.approved && (
                        <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MoCodex Developer Credit */}
      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          Developed by MoCodex – Digital Solutions
        </p>
      </div>
    </div>
  );
}
