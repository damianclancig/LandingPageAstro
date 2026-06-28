'use client';

import React, { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (import.meta.env?.DEV) {
      console.error('[Client Error]:', error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-6 text-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
      <div className="max-w-md space-y-4">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          Algo no salió como esperábamos
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Ha ocurrido un error inesperado al procesar tu solicitud. Por favor, intenta reintentar la operación.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center min-h-[44px] min-w-[140px] px-6 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
