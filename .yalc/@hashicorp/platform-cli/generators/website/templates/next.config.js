const withHashicorp = require('@hashicorp/nextjs-scripts')

module.exports = withHashicorp()({
  env: {
    HASHI_ENV: process.env.HASHI_ENV || 'development',
    // WARNING: The values below are test keys only and should be changed out asap
    SEGMENT_WRITE_KEY: 'xxx',
    BUGSNAG_CLIENT_KEY: 'c1d6da7a26dc367253f39fae8d83fdac',
    BUGSNAG_SERVER_KEY: 'c1d6da7a26dc367253f39fae8d83fdac',
  }
})
