import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
});

export default {
  port: parseInt(process.env.PORT, 10),
  secret: process.env.SECRET,
  expiresIn: '48hrs',
  env: process.env.ENV,
  redis: {
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    port: parseInt(process.env.REDIS_PORT),
  },
};
