import { useTranslation } from 'react-i18next';
import { Award, Heart, Users, Sparkles, MapPin, Phone } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Award,
      title: t('about.quality'),
      description: t('about.qualityDesc'),
    },
    {
      icon: Sparkles,
      title: t('about.design'),
      description: t('about.designDesc'),
    },
    {
      icon: Heart,
      title: t('about.service'),
      description: t('about.serviceDesc'),
    },
  ];

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Products' },
    { value: '1000+', label: 'Happy Customers' },
    { value: '50+', label: 'Design Awards' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-[hsl(var(--wood-dark))]">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/showroom.jpg"
            alt="Showroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-white/80">
              Crafting elegance for your home since 2009
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/craftsmanship.jpg"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[hsl(var(--beige))] rounded-2xl -z-10 hidden lg:block" />
            </div>
            <div>
              <span className="text-[hsl(var(--wood-medium))] font-medium mb-4 block">
                {t('about.story')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))] mb-6">
                A Legacy of Fine Furniture Making
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Merakchi Meuble was founded in 2009 in Ain Beida, Oum El Bouaghi, with a simple 
                  mission: to bring high-quality, beautifully crafted furniture to Algerian homes. 
                  What started as a small family workshop has grown into one of the region's most 
                  trusted furniture destinations.
                </p>
                <p>
                  Our journey began with a passion for woodworking and an unwavering commitment to 
                  quality. Each piece that leaves our showroom carries with it the dedication and 
                  craftsmanship that has defined our brand for over 15 years.
                </p>
                <p>
                  Today, we continue to blend traditional techniques with modern design, creating 
                  furniture that not only serves its purpose but also becomes a statement piece in 
                  your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[hsl(var(--beige))]">
        <div className="section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-[hsl(var(--wood-dark))] mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="section-padding">
          <div className="text-center mb-16">
            <span className="text-[hsl(var(--wood-medium))] font-medium mb-4 block">
              {t('about.philosophy')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-[hsl(var(--beige))] hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[hsl(var(--wood-dark))] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[hsl(var(--wood-dark))] mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Workshop Section */}
      <section className="py-20 bg-[hsl(var(--beige))]">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[hsl(var(--wood-medium))] font-medium mb-4 block">
                Our Workshop
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))] mb-6">
                Where Craftsmanship Meets Passion
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our workshop in Ain Beida is where the magic happens. Here, skilled artisans 
                  combine traditional woodworking techniques with modern precision tools to create 
                  furniture that stands the test of time.
                </p>
                <p>
                  We source only the finest materials, from premium hardwoods to high-quality 
                  fabrics and finishes. Every piece undergoes rigorous quality checks before it 
                  reaches your home.
                </p>
                <p>
                  Our team of designers and craftsmen work together to bring you furniture that 
                  is not only beautiful but also functional and durable.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/workshop.jpg"
                  alt="Our Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-[hsl(var(--wood-dark))]/10 rounded-2xl -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20">
        <div className="section-padding">
          <div className="text-center mb-12">
            <span className="text-[hsl(var(--wood-medium))] font-medium mb-4 block">
              {t('about.location')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--wood-dark))] mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our furniture collection in person. Our showroom in Ain Beida is open 
              daily for you to explore and find the perfect pieces for your home.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <div className="lg:col-span-2 aspect-video lg:aspect-auto rounded-2xl overflow-hidden bg-[hsl(var(--beige))] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-[hsl(var(--wood-medium))] mx-auto mb-4" />
                <p className="text-lg font-medium text-[hsl(var(--wood-dark))]">
                  Ain Beida, Oum El Bouaghi, Algeria
                </p>
                <p className="text-muted-foreground mt-2">
                  Interactive map will be displayed here
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[hsl(var(--beige))]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--wood-dark))] rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[hsl(var(--wood-dark))]">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Ain Beida, Oum El Bouaghi, Algeria
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[hsl(var(--beige))]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--wood-dark))] rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[hsl(var(--wood-dark))]">Phone</p>
                    <p className="text-sm text-muted-foreground">+213 550 12 34 56</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[hsl(var(--beige))]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--wood-dark))] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[hsl(var(--wood-dark))]">Working Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Sat - Thu: 9:00 AM - 7:00 PM
                    </p>
                    <p className="text-sm text-muted-foreground">Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
