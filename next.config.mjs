import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

export default function config(phase) {
  return {
    output: 'export',
    // Keep repository instructions unchanged by development tooling.
    agentRules: false,
    trailingSlash: false,
    images: { unoptimized: true },
    ...(phase === PHASE_DEVELOPMENT_SERVER
      ? {
          async rewrites() {
            return ['index', 'about', 'rates-faq', 'support', 'book'].map(
              (page) => ({
                source: `/${page}.html`,
                destination: page === 'index' ? '/' : `/${page}`,
              }),
            );
          },
        }
      : {}),
  };
}
