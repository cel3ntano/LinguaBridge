import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';

export default function Home() {
  return (
    <main className="mx-auto max-w-[1440px] mt-5 px-16 pb-8">
      <Hero />
      <Stats />
    </main>
  );
}
