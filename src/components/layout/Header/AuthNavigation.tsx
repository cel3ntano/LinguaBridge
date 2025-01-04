import Link from 'next/link';
import Icon from '@/components/common/Icon';

interface AuthNavigationProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const AuthNavigation = ({ isLoggedIn, onLogout }: AuthNavigationProps) => {
  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={onLogout}
          className="text-text-primary hover:text-accent-primary transition-colors"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="flex items-center text-text-primary hover:text-accent-primary transition-colors"
      >
        <Icon id="#login" className="w-5 h-5 stroke-accent-light fill-none" />
        <span className="ml-2">Log in</span>
      </Link>
      <Link
        href="/registration"
        className="px-10 py-3.5 rounded-xl leading-5 bg-text-primary text-background-primary font-bold hover:bg-accent-light transition-colors"
      >
        Registration
      </Link>
    </div>
  );
};

export default AuthNavigation;
