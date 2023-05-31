const mongooseUrl = 'mongodb://localhost:27017/bitfilmsdb';

const { PORT = 3000 } = process.env;

const DEFAULT_JWT_SECRET = 'super-secret-key';

function getJwtSecret() {
  return process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
}

module.exports = {
  mongooseUrl,
  getJwtSecret,
  PORT,
};
