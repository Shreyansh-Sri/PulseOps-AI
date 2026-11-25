import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-var(--bg) text-var(--text)">
      <div className="max-w-md text-center glass-panel p-8">
        <h1 className="text-4xl font-bold mb-4 text-gradient">404 – Page Not Found</h1>
        <p className="mb-6">The page you are looking for does not exist.</p>
        <Link href="/" className="glass-btn px-4 py-2">
          Return Home
        </Link>
      </div>
    </div>
  );
}
