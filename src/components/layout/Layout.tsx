import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from '@/store/useStore';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
