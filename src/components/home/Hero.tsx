import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="flex gap-6 mb-6">
      <div className="flex-1 rounded-[30px] bg-background-backdrop">
        <h1 className="pt-24 pl-16 max-w-[600px] text-text-primary text-5xl font-medium tracking-[-.02em] leading-[1.17]">
          Unlock your potential with the best{' '}
          <span className="inline-block italic font-normal text-text-primary bg-accent-light px-2 py-1 rounded-lg leading-[0.7] align-baseline">
            language
          </span>{' '}
          tutors
        </h1>

        <p className="mt-8 pl-16 text-text-primary tracking-[-.02em] leading-[1.375] max-w-[500px]">
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>

        <div className="mt-16 pl-16 pb-16">
          <Link
            href="/teachers"
            className="inline-block py-4 px-[88px] rounded-xl bg-accent-primary hover:bg-accent-light transition-colors text-text-primary text-lg font-bold leading-[1.56]"
          >
            Get started
          </Link>
        </div>
      </div>

      <div
        className="w-[568px] h-[530px] rounded-[30px] bg-accent-light bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
    </div>
  );
};

export default Hero;
