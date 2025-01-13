import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/lib/hooks';
import { selectUser, selectIsAuthenticated } from '@/store/auth/authSelectors';
import { useAppDispatch } from '@/lib/hooks';
import { signOut } from '@/store/auth/authOperations';
import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';

interface MobileMenuProps {
  onClose: () => void;
  navigationItems: Array<{
    path: string;
    label: string;
    requiresAuth?: boolean;
  }>;
  onLogin: () => void;
  onRegister: () => void;
}

const MobileMenu = ({
  onClose,
  navigationItems,
  onLogin,
  onRegister,
}: MobileMenuProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, scrollY);

      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const handleLogout = () => {
    dispatch(signOut());
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-brand-dark/60 z-40"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-[280px] bg-brand-white z-50 p-6 overflow-y-auto"
      >
        <Button
          variant="icon"
          onClick={onClose}
          className="absolute right-4 top-4"
          aria-label="Close menu"
        >
          <Icon id="#close" className="h-6 w-6 stroke-brand-dark" />
        </Button>

        <div className="mt-12 flex flex-col">
          {isAuthenticated && user && (
            <div className="mb-6 pb-6 border-b border-brand-gray/40">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-text-primary">
                  {user.name}
                </span>
                <Button variant="logout" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            </div>
          )}

          <nav className="space-y-6">
            {navigationItems.map((item) => {
              if (!item.requiresAuth || isAuthenticated) {
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block text-lg ${
                      isLinkActive(item.path)
                        ? 'font-medium text-brand-wildBlue'
                        : 'text-text-primary'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}
          </nav>

          {!isAuthenticated && (
            <div className="mt-6 pt-6 border-t border-brand-gray/40">
              <div className="flex flex-col space-y-4">
                <Button
                  variant="login"
                  onClick={onLogin}
                  className="flex items-center"
                >
                  <Icon
                    id="#login"
                    className="w-5 h-5 stroke-accent-light fill-none"
                  />
                  <span className="ml-2">Log in</span>
                </Button>
                <Button variant="registration" onClick={onRegister}>
                  Registration
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MobileMenu;
