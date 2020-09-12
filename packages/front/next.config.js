module.exports = {
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
