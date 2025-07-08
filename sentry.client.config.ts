// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://77485db0a7e7c5f49910a0e980e4fdc5@o4508500410761216.ingest.us.sentry.io/4508500415217664",

  // Add optional integrations for additional features
  integrations: [
    // Disable replay integration để tránh conflict với 3D content
    // Sentry.replayIntegration({
    //   // Additional Replay cofiguration goes in here, for example:
    //   maskAllText: true,
    //   blockAllMedia: true,
    // }),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "dark",
    }),
  ],

  // Giảm sampling rate để tránh performance issues
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,

  // Disable replay sampling để tránh conflict với 3D rendering
  replaysSessionSampleRate: 0,

  // Giảm error replay sampling
  replaysOnErrorSampleRate: 0,

  // Disable debug để tránh console spam
  debug: false,

  // Chỉ enable Sentry trong production và khi không có lỗi
  enabled: process.env.NODE_ENV === 'production',
});
