import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon, Phone, ChevronDown } from 'lucide-react';
import { useThemeStore, useLanguageStore, useUIStore } from '@/store/useStore';
import { languages } from '@/lib/i18n';
import type { LanguageCode } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    document.documentElement.dir = languages.find(l => l.code === currentLanguage)?.dir || 'ltr';
  }, [currentLanguage, i18n]);

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 bg-[hsl(var(--wood-dark))] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[hsl(var(--wood-dark))]">
                Merakchi
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Meuble</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-[hsl(var(--wood-dark))]'
                    : 'text-muted-foreground hover:text-[hsl(var(--wood-dark))]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[hsl(var(--wood-dark))] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Phone - Desktop */}
            <a
              href="tel:+213550123456"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-[hsl(var(--wood-dark))] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+213 550 12 34 56</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary hover:bg-[hsl(var(--wood-light))] hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg bg-secondary hover:bg-[hsl(var(--wood-light))] hover:text-white transition-colors text-sm font-medium">
                {languages.find(l => l.code === currentLanguage)?.name}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as LanguageCode)}
                    className={currentLanguage === lang.code ? 'bg-accent' : ''}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg bg-secondary hover:bg-[hsl(var(--wood-light))] hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[hsl(var(--wood-dark))] text-white'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-border mt-2">
                <p className="px-4 text-xs text-muted-foreground mb-2">{t('common.language')}</p>
                <div className="flex gap-2 px-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as LanguageCode)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        currentLanguage === lang.code
                          ? 'bg-[hsl(var(--wood-dark))] text-white'
                          : 'bg-secondary hover:bg-[hsl(var(--wood-light))] hover:text-white'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Phone */}
              <a
                href="tel:+213550123456"
                className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground"
              >
                <Phone className="w-4 h-4" />
                <span>+213 550 12 34 56</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
