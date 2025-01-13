import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-6">
      <div className="flex-1 rounded-[30px] bg-background-backdrop">
        <h1 className="pt-8 sm:pt-12 lg:pt-24 px-6 sm:px-8 lg:px-16 max-w-[600px] text-text-primary text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-.02em] leading-[1.17]">
          Unlock your potential with the best{' '}
          <span className="inline-block italic font-normal text-text-primary bg-accent-light px-2 py-1 rounded-lg leading-[0.7] align-baseline">
            language
          </span>{' '}
          tutors
        </h1>
        <p className="mt-4 sm:mt-6 lg:mt-8 px-6 sm:px-8 lg:px-16 text-text-primary tracking-[-.02em] leading-[1.375] text-sm sm:text-base max-w-[500px]">
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <div className="mt-8 sm:mt-12 lg:mt-16 px-6 sm:px-8 lg:px-16 pb-8 sm:pb-12 lg:pb-16">
          <Link
            href="/teachers"
            className="inline-block w-full sm:w-auto text-center py-3 sm:py-4 px-6 sm:px-[88px] rounded-xl bg-accent-primary hover:bg-accent-light transition-colors text-text-primary text-base sm:text-lg font-bold leading-[1.56]"
          >
            Get started
          </Link>
        </div>
      </div>
      <div
        className="h-[300px] sm:h-[400px] lg:h-[530px] w-full lg:w-[568px] rounded-[30px] bg-accent-light bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
    </div>
  );
};

export default Hero;
