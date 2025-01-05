'use client';

import Link from 'next/link';
import Button from '@/components/common/Button';
// import Icon from '@/components/common/Icon';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] max-w-[1440px] flex-col items-center justify-center px-16">
      <div className="text-center">
        {/* <div className="mb-8 flex items-center justify-center">
          <Icon id="#logo" className="h-12 w-12" />
          <span className="ml-3 text-4xl font-medium tracking-[-0.8px] text-text-primary">
            LinguaBridge
          </span>
        </div> */}

        <h1 className="mb-6 text-[120px] font-bold leading-none tracking-tight text-accent-primary">
          404
        </h1>

        <h2 className="mb-4 text-3xl font-medium text-text-primary">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-text-secondary">
          Sorry, the page you&apos;re looking for doesn&apos;t exist
        </p>

        <div className="flex justify-center space-x-4">
          <Button
            variant="primary"
            onClick={() => window.history.back()}
            className="px-8"
          >
            Go Back
          </Button>
          <Link href="/">
            <Button variant="secondary" className="px-8">
              Home Page
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
