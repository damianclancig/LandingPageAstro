'use client';

import React, { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (import.meta.env?.DEV) {
      console.error('[Global Catastrophic Error]:', error);
    }
  }, [error]);

  return (
    <html lang="es" className="dark">
      <body className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased p-6 text-center">
        <div className="max-w-lg space-y-6 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-red-500">
            Error Crítico del Sistema
          </h1>
          <p className="text-base text-zinc-300">
            Se ha producido un error crítico que impide mostrar la aplicación correctamente. Puedes intentar recargar o reintentar.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[160px] px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Reintentar Renderizado
          </button>
        </div>
      </body>
    </html>
  );
}
