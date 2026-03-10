import type { Product, Review, Message } from '@/types/database';

// Initial mock data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Sofa Set',
    name_ar: 'طقم أريكة حديث',
    name_fr: 'Ensemble Canapé Moderne',
    description: 'Elegant 3-piece sofa set with premium fabric upholstery. Perfect for modern living rooms with its sleek design and comfortable seating.',
    description_ar: 'طقم أريكة أنيق من 3 قطع مع تنجيد قماش فاخر. مثالي لغرف المعيشة العصرية بتصميمه الأنيق ومقاعده المريحة.',
    description_fr: 'Ensemble canapé élégant 3 pièces avec garnissage en tissu premium. Parfait pour les salons modernes avec son design épuré.',
    price: 125000,
    category: 'Living Room',
    images: ['/images/sofa-1.jpg'],
    specifications: { 'Material': 'Premium Fabric', 'Seats': '5-6 people', 'Dimensions': '280x180 cm' },
    featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '2',
    name: 'Luxury Bedroom Set',
    name_ar: 'طقم غرفة نوم فاخر',
    name_fr: 'Ensemble Chambre Luxe',
    description: 'Complete bedroom set including bed frame, nightstands, and dresser. Crafted from solid wood with elegant finish.',
    description_ar: 'طقم غرفة نوم كامل يشمل إطار السرير والطاولات الجانبية والخزانة. مصنوع من الخشب الصلب بلمسة أنيقة.',
    description_fr: 'Ensemble chambre complet incluant cadre de lit, tables de nuit et commode. Fabriqué en bois massif.',
    price: 180000,
    category: 'Bedroom',
    images: ['/images/bedroom-1.jpg'],
    specifications: { 'Material': 'Solid Wood', 'Bed Size': 'King Size', 'Pieces': '4 pieces' },
    featured: true,
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
  },
  {
    id: '3',
    name: 'Dining Table Set',
    name_ar: 'طقم طاولة طعام',
    name_fr: 'Ensemble Table à Manger',
    description: 'Beautiful dining table with 6 matching chairs. Made from high-quality wood with a natural finish.',
    description_ar: 'طاولة طعام جميلة مع 6 كراسي متناسقة. مصنوعة من خشب عالي الجودة بلمسة طبيعية.',
    description_fr: 'Belle table à manger avec 6 chaises assorties. Fabriquée en bois de haute qualité.',
    price: 95000,
    category: 'Tables',
    images: ['/images/dining-1.jpg'],
    specifications: { 'Material': 'Oak Wood', 'Seats': '6 people', 'Dimensions': '180x90 cm' },
    featured: false,
    created_at: '2024-01-03',
    updated_at: '2024-01-03',
  },
  {
    id: '4',
    name: 'Designer Armchair',
    name_ar: 'كرسي بذراعين مصمم',
    name_fr: 'Fauteuil Design',
    description: 'Stylish designer armchair with velvet upholstery. Adds a touch of luxury to any room.',
    description_ar: 'كرسي بذراعين أنيق مع تنجيد مخملي. يضيف لمسة من الفخامة لأي غرفة.',
    description_fr: 'Fauteuil design élégant avec garnissage en velours. Ajoute une touche de luxe à toute pièce.',
    price: 45000,
    category: 'Chairs',
    images: ['/images/chair-1.jpg'],
    specifications: { 'Material': 'Velvet', 'Color': 'Navy Blue', 'Dimensions': '80x85 cm' },
    featured: true,
    created_at: '2024-01-04',
    updated_at: '2024-01-04',
  },
  {
    id: '5',
    name: 'Coffee Table',
    name_ar: 'طاولة قهوة',
    name_fr: 'Table Basse',
    description: 'Modern coffee table with glass top and metal frame. Perfect centerpiece for your living room.',
    description_ar: 'طاولة قهوة عصرية مع سطح زجاجي وإطار معدني. قطعة مركزية مثالية لغرفة المعيشة.',
    description_fr: 'Table basse moderne avec plateau en verre et cadre métallique. Pièce maîtresse parfaite.',
    price: 35000,
    category: 'Tables',
    images: ['/images/table-1.jpg'],
    specifications: { 'Material': 'Glass & Metal', 'Shape': 'Round', 'Dimensions': '100x45 cm' },
    featured: false,
    created_at: '2024-01-05',
    updated_at: '2024-01-05',
  },
  {
    id: '6',
    name: 'Decorative Mirror',
    name_ar: 'مرآة زخرفية',
    name_fr: 'Miroir Décoratif',
    description: 'Elegant decorative mirror with ornate frame. Adds depth and style to any wall.',
    description_ar: 'مرآة زخرفية أنيقة بإطار مزخرف. تضيف عمقاً وأناقة لأي جدار.',
    description_fr: 'Miroir décoratif élégant avec cadre orné. Ajoute profondeur et style à tout mur.',
    price: 28000,
    category: 'Decoration',
    images: ['/images/mirror-1.jpg'],
    specifications: { 'Material': 'Wood & Glass', 'Shape': 'Oval', 'Dimensions': '120x80 cm' },
    featured: false,
    created_at: '2024-01-06',
    updated_at: '2024-01-06',
  },
];

const initialReviews: Review[] = [
  {
    id: '1',
    customer_name: 'Ahmed Benali',
    rating: 5,
    comment: 'Excellent quality furniture! The sofa set exceeded my expectations. Highly recommend Merakchi Meuble.',
    approved: true,
    created_at: '2024-02-01',
  },
  {
    id: '2',
    customer_name: 'Fatima Zohra',
    rating: 5,
    comment: 'Beautiful bedroom set. The craftsmanship is outstanding and delivery was prompt.',
    approved: true,
    created_at: '2024-02-05',
  },
  {
    id: '3',
    customer_name: 'Karim Hadj',
    rating: 4,
    comment: 'Great service and quality products. Will definitely buy again.',
    approved: true,
    created_at: '2024-02-10',
  },
];

const initialMessages: Message[] = [
  {
    id: '1',
    name: 'Mohamed Ali',
    phone: '0555123456',
    message: 'Hello, I am interested in the Modern Sofa Set. Is it available in other colors?',
    read: false,
    created_at: '2024-03-01',
  },
  {
    id: '2',
    name: 'Sarah Mansouri',
    phone: '0666789012',
    message: 'Do you offer delivery to Constantine? I would like to order the Dining Table Set.',
    read: true,
    created_at: '2024-03-02',
  },
];

// Storage keys
const PRODUCTS_KEY = 'merakchi_products';
const REVIEWS_KEY = 'merakchi_reviews';
const MESSAGES_KEY = 'merakchi_messages';

// Initialize storage with default data if empty
const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(REVIEWS_KEY)) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(initialReviews));
  }
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(initialMessages));
  }
};

// Get data from localStorage
const getStoredProducts = (): Product[] => {
  if (typeof window === 'undefined') return initialProducts;
  initializeStorage();
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : initialProducts;
};

const getStoredReviews = (): Review[] => {
  if (typeof window === 'undefined') return initialReviews;
  initializeStorage();
  const data = localStorage.getItem(REVIEWS_KEY);
  return data ? JSON.parse(data) : initialReviews;
};

const getStoredMessages = (): Message[] => {
  if (typeof window === 'undefined') return initialMessages;
  initializeStorage();
  const data = localStorage.getItem(MESSAGES_KEY);
  return data ? JSON.parse(data) : initialMessages;
};

// Save data to localStorage
const saveProducts = (products: Product[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

const saveReviews = (reviews: Review[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};

const saveMessages = (messages: Message[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

// Products API
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getStoredProducts()), 300);
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      const product = products.find((p) => p.id === id);
      resolve(product || null);
    }, 300);
  });
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      resolve(products.filter((p) => p.featured));
    }, 300);
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      if (category === 'All') {
        resolve([...products]);
      } else {
        resolve(products.filter((p) => p.category === category));
      }
    }, 300);
  });
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      const newProduct: Product = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      products.push(newProduct);
      saveProducts(products);
      resolve(newProduct);
    }, 300);
  });
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updates, updated_at: new Date().toISOString() };
        saveProducts(products);
        resolve(products[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        saveProducts(products);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

// Reviews API
export const getReviews = async (): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getStoredReviews()), 300);
  });
};

export const getApprovedReviews = async (): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reviews = getStoredReviews();
      resolve(reviews.filter((r) => r.approved));
    }, 300);
  });
};

export const createReview = async (review: Omit<Review, 'id' | 'created_at'>): Promise<Review> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reviews = getStoredReviews();
      const newReview: Review = {
        ...review,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
      };
      reviews.push(newReview);
      saveReviews(reviews);
      resolve(newReview);
    }, 300);
  });
};

export const approveReview = async (id: string): Promise<Review | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reviews = getStoredReviews();
      const index = reviews.findIndex((r) => r.id === id);
      if (index !== -1) {
        reviews[index].approved = true;
        saveReviews(reviews);
        resolve(reviews[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const deleteReview = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reviews = getStoredReviews();
      const index = reviews.findIndex((r) => r.id === id);
      if (index !== -1) {
        reviews.splice(index, 1);
        saveReviews(reviews);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

// Messages API
export const getMessages = async (): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getStoredMessages()), 300);
  });
};

export const createMessage = async (message: Omit<Message, 'id' | 'created_at' | 'read'>): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getStoredMessages();
      const newMessage: Message = {
        ...message,
        id: Math.random().toString(36).substr(2, 9),
        read: false,
        created_at: new Date().toISOString(),
      };
      messages.push(newMessage);
      saveMessages(messages);
      resolve(newMessage);
    }, 300);
  });
};

export const markMessageAsRead = async (id: string): Promise<Message | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getStoredMessages();
      const index = messages.findIndex((m) => m.id === id);
      if (index !== -1) {
        messages[index].read = true;
        saveMessages(messages);
        resolve(messages[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getStoredMessages();
      const index = messages.findIndex((m) => m.id === id);
      if (index !== -1) {
        messages.splice(index, 1);
        saveMessages(messages);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

// Analytics
export const getAnalytics = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = getStoredProducts();
      const reviews = getStoredReviews();
      const messages = getStoredMessages();
      resolve({
        totalProducts: products.length,
        totalReviews: reviews.length,
        totalMessages: messages.length,
        featuredProducts: products.filter((p) => p.featured).length,
        unreadMessages: messages.filter((m) => !m.read).length,
        pendingReviews: reviews.filter((r) => !r.approved).length,
      });
    }, 300);
  });
};

// Reset to initial data (for testing)
export const resetData = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(initialReviews));
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(initialMessages));
};
