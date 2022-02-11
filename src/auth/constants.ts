import configuration from '../../config/configuration';

export const jwtConstants = {
  secret: configuration.secret,
  expiresIn: configuration.expiresIn,
};
