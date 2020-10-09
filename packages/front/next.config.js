/* eslint-disable */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  const env = {
    // from https://github.com/vercel/next.js/blob/canary/examples/with-env-from-next-config-js/next.config.js
    IS_DEV: phase === PHASE_DEVELOPMENT_SERVER && false,
    IS_PROD: phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1',
    IS_STAGE: phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1',
  };
  return {
    env,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/account/login',
          permanent: true,
        },
      ];
    },
  };
};
