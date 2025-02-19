import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key', 
    expires: process.env.JWT_EXPIRES || '1h', 
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
  },
  apple: {
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    privateKey: process.env.APPLE_PRIVATE_KEY,
    callbackURL: process.env.APPLE_CALLBACK_URL,
  },
}));
