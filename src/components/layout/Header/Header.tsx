'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import AuthNavigation from '@/components/layout/Header/AuthNavigation';
import Icon from '@/components/common/Icon';
import RegistrationModal from '@/components/features/auth/RegistrationModal';
import LoginModal from '@/components/features/auth/LoginModal';

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
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

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

  return (
    <header className="mx-auto max-w-[1440px] px-[128px] my-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center text-xl font-medium tracking-[-0.4px] text-text-primary transition-colors hover:text-accent-primary"
          >
            <Icon id="#logo" className="h-6 w-6" />
            <span className="ml-2">LinguaBridge</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-7">
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

        <AuthNavigation
          onLogin={() => setIsLoginModalOpen(true)}
          onRegister={() => setIsRegistrationModalOpen(true)}
        />

        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
