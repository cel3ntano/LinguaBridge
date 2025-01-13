import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';

export default function Home() {
  return (
    <main className="mx-auto max-w-[1440px] mt-5 px-4 sm:px-6 md:px-8 lg:px-16 pb-8">
      <Hero />
      <Stats />
    </main>
  );
}
