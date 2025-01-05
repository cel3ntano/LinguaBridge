export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}
