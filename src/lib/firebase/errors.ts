import { FirebaseError } from 'firebase/app';

export const formatFirebaseError = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not enabled. Please contact support.';
    default:
      if (error.message?.includes('database')) {
        return 'Database connection error. Please try again later.';
      }
      return error.message || 'An unexpected error occurred';
  }
};
