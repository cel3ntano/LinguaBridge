import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectUser, selectIsAuthenticated } from '@/store/auth/authSelectors';
import { signOut } from '@/store/auth/authOperations';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

interface AuthNavigationProps {
  onLogin: () => void;
  onRegister: () => void;
}

const AuthNavigation = ({ onLogin, onRegister }: AuthNavigationProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(signOut());
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-text-primary text-base sm:text-lg truncate max-w-[120px] sm:max-w-none">
          {user.name}
        </span>
        <Button
          variant="logout"
          onClick={handleLogout}
          className="px-2 sm:px-4"
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Button
        variant="login"
        onClick={onLogin}
        className="flex items-center px-2 sm:px-4"
      >
        <Icon id="#login" className="w-5 h-5 stroke-accent-light fill-none" />
        <span className="ml-2 hidden sm:inline">Log in</span>
      </Button>

      <Button
        variant="registration"
        onClick={onRegister}
        className="px-10 py-3 text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Registration</span>
        <span className="sm:hidden">Sign Up</span>
      </Button>
    </div>
  );
};

export default AuthNavigation;
