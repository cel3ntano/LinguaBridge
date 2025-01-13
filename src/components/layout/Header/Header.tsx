'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import AuthNavigation from '@/components/layout/Header/AuthNavigation';
import Icon from '@/components/common/Icon';
import RegistrationModal from '@/components/features/auth/RegistrationModal';
import LoginModal from '@/components/features/auth/LoginModal';
import MobileMenu from './MobileMenu';
import Button from '@/components/common/Button';
import { useAppDispatch } from '@/lib/hooks';
import { clearError } from '@/store/auth/authSlice';

interface NavItem {
  path: string;
  label: string;
  requiresAuth?: boolean;
}

const navigationItems: NavItem[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/teachers',
    label: 'Teachers',
  },
  {
    path: '/favorites',
    label: 'Favorites',
    requiresAuth: true,
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const getLinkClasses = (path: string) =>
    `transition-colors hover:text-accent-primary ${
      isLinkActive(path)
        ? 'font-medium text-brand-wildBlue'
        : 'text-text-primary'
    }`;

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsMobileMenuOpen(false);
    setIsRegistrationModalOpen(true);
  };

  return (
    <>
      <header className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[128px] my-5">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center text-xl font-medium tracking-[-0.4px] text-text-primary transition-colors hover:text-accent-primary"
            >
              <Icon id="#logo" className="h-6 w-6" />
              <span className="ml-2">LinguaBridge</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-7">
            {navigationItems.map((item) => {
              if (!item.requiresAuth || isAuthenticated) {
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={getLinkClasses(item.path)}
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}
          </nav>

          <div className="hidden md:block">
            <AuthNavigation
              onLogin={handleLoginClick}
              onRegister={handleRegisterClick}
            />
          </div>

          <Button
            variant="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6 stroke-brand-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            navigationItems={navigationItems}
            onLogin={handleLoginClick}
            onRegister={handleRegisterClick}
          />
        )}
      </AnimatePresence>

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => {
          dispatch(clearError());
          setIsRegistrationModalOpen(false);
        }}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          dispatch(clearError());
          setIsLoginModalOpen(false);
        }}
      />
    </>
  );
};

export default Header;
