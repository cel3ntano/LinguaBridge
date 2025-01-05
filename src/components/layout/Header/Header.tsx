'use client';
import Link from 'next/link';
import { useState } from 'react';
import AuthNavigation from '@/components/layout/Header/AuthNavigation';
import Icon from '@/components/common/Icon';
import RegistrationModal from '@/components/features/auth/RegistrationModal';
import LoginModal from '@/components/features/auth/LoginModal';

interface HeaderProps {
  initialLoggedIn?: boolean;
}

const Header = ({ initialLoggedIn = false }: HeaderProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  const handleLogout = () => {
    // Will implement logout logic later
    console.log('Logout clicked');
    setIsLoggedIn(false);
  };

  return (
    <header className="mx-auto max-w-[1440px] px-[128px] py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center text-xl font-medium tracking-[-0.4px] text-text-primary transition-colors hover:text-accent-primary"
          >
            <Icon id="#logo" className="h-6 w-6" />
            <span className="ml-2">LearnLingo</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-7">
          <Link
            href="/"
            className="text-text-primary transition-colors hover:text-accent-primary"
          >
            Home
          </Link>
          <Link
            href="/teachers"
            className="text-text-primary transition-colors hover:text-accent-primary"
          >
            Teachers
          </Link>
          {isLoggedIn && (
            <Link
              href="/favorites"
              className="text-text-primary transition-colors hover:text-accent-primary"
            >
              Favorites
            </Link>
          )}
        </nav>

        <AuthNavigation
          isLoggedIn={isLoggedIn}
          onLogin={() => setIsLoginModalOpen(true)}
          onRegister={() => setIsRegistrationModalOpen(true)}
          onLogout={handleLogout}
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
