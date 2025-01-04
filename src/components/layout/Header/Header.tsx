import Link from 'next/link';
import AuthNavigation from '@/components/layout/Header/AuthNavigation';
import Icon from '@/components/common/Icon';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const Header = ({ isLoggedIn, onLogout }: HeaderProps) => {
  return (
    <header className="mx-auto max-w-[1440px] px-[128px] py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center text-text-primary text-xl font-medium tracking-[-0.4px] hover:text-accent-primary transition-colors"
          >
            <Icon id="#logo" className="w-6 h-6" />
            <span className="ml-2">LearnLingo</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-text-primary hover:text-accent-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/teachers"
            className="text-text-primary hover:text-accent-primary transition-colors"
          >
            Teachers
          </Link>
          {isLoggedIn && (
            <Link
              href="/favorites"
              className="text-text-primary hover:text-accent-primary transition-colors"
            >
              Favorites
            </Link>
          )}
        </nav>
        <AuthNavigation isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Header;
