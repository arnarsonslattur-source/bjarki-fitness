import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// HTML-rammi fyrir vefútgáfuna (Safari / heimaskjár á iPhone).
const BASE = '/bjarki-fitness';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="is">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="theme-color" content="#0B0D10" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bjarki" />
        <link rel="apple-touch-icon" href={`${BASE}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${BASE}/manifest.json`} />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: 'html,body{background-color:#0B0D10;}' }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
