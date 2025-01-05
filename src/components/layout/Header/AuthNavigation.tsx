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
      <div className="flex items-center space-x-4">
        <span className="text-text-primary text-lg">{user.name}</span>
        <Button variant="logout" onClick={handleLogout}>
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
