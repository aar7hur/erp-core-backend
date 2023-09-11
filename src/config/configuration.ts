export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  secrets: {
    token_secret: process.env.TOKEN_SECRET,
    bcrypt_salt: process.env.BCRYPT_SALT,
    token_expiration_time_seconds: process.env.TOKEN_EXPIRATION_TIME_SECONDS,
  },
  server: {
    client_url: process.env.CLIENT_URL,
  },
  email: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASS,
    secure: process.env.MAIL_SECURE,
  },
});
