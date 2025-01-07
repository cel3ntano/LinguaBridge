'use client';
import { useAppSelector } from '@/lib/hooks';
import { selectIsInitialized } from '@/store/auth/authSelectors';
import Header from '@/components/layout/Header/Header';
import LoadingScreen from '@/components/common/LoadingScreen';

interface RootLayoutContentProps {
  children: React.ReactNode;
}

const RootLayoutContent = ({ children }: RootLayoutContentProps) => {
  const isInitialized = useAppSelector(selectIsInitialized);

  return isInitialized ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <LoadingScreen />
  );
};

export default RootLayoutContent;
