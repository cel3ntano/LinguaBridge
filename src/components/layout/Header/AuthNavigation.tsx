'use client';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

interface AuthNavigationProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

const AuthNavigation = ({
  isLoggedIn,
  onLogin,
  onRegister,
  onLogout,
}: AuthNavigationProps) => {
  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="login" onClick={onLogout}>
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="login" onClick={onLogin} className="flex items-center">
        <Icon id="#login" className="w-5 h-5 stroke-accent-light fill-none" />
        <span className="ml-2">Log in</span>
      </Button>

      <Button variant="registration" onClick={onRegister}>
        Registration
      </Button>
    </div>
  );
};

export default AuthNavigation;
