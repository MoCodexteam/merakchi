import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { createMessage } from '@/lib/dataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await createMessage({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      });
      setIsSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: '+213 550 12 34 56',
      href: 'tel:+213550123456',
    },
    {
      icon: MessageCircle,
      title: t('contact.info.whatsapp'),
      value: '+213 550 12 34 56',
      href: 'https://wa.me/213550123456',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@merakchimeuble.com',
      href: 'mailto:contact@merakchimeuble.com',
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      value: 'Ain Beida, Oum El Bouaghi, Algeria',
      href: '#',
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      value: 'Sat - Thu: 9:00 AM - 7:00 PM',
      href: '#',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-20 bg-[hsl(var(--beige))]">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--wood-dark))] mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-muted-foreground text-lg">{t('contact.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[hsl(var(--wood-dark))] mb-6">
                    Send us a Message
                  </h2>

                  {isSuccess && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {t('contact.form.success')}
                    </div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-[hsl(var(--wood-dark))]">
                        {t('contact.form.name')}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-[hsl(var(--wood-dark))]">
                        {t('contact.form.phone')}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+213 XXX XX XX XX"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-[hsl(var(--wood-dark))]">
                        {t('contact.form.message')}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        className="mt-2 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t('contact.form.submit')}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[hsl(var(--wood-dark))] mb-6">
                Contact Information
              </h2>

              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--beige))] hover:bg-[hsl(var(--wood-light))] hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 bg-[hsl(var(--wood-dark))] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[hsl(var(--wood-dark))] transition-colors">
                    <info.icon className="w-6 h-6 text-white group-hover:text-[hsl(var(--wood-dark))]" />
                  </div>
                  <div>
                    <p className="font-medium">{info.title}</p>
                    <p className="text-sm text-muted-foreground group-hover:text-white/80">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Map */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[hsl(var(--wood-dark))] mb-4">
                  {t('contact.location')}
                </h3>
                <div className="aspect-video rounded-2xl overflow-hidden bg-[hsl(var(--beige))] flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-12 h-12 text-[hsl(var(--wood-medium))] mx-auto mb-3" />
                    <p className="text-[hsl(var(--wood-dark))] font-medium">
                      Ain Beida, Oum El Bouaghi
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Algeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-[hsl(var(--wood-dark))]">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prefer to Call or WhatsApp?
            </h2>
            <p className="text-white/70 mb-8">
              Our team is ready to assist you with any inquiries about our products and services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+213550123456">
                <Button size="lg" className="bg-white text-[hsl(var(--wood-dark))] hover:bg-white/90 gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
              </a>
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
