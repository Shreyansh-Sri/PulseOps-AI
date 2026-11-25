import React from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-md text-center glass-panel p-8">
        <h1 className="text-4xl font-bold mb-4 text-gradient">Oops! Something went wrong.</h1>
        <p className="mb-6">{error?.message || 'An unexpected error occurred.'}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="glass-btn px-4 py-2"
          >
            Retry
          </button>
          <Link href="/" className="glass-btn px-4 py-2">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
