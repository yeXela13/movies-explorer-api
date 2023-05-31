const mongooseUrl = 'mongodb://localhost:27017/bitfilmsdb';

const { PORT = 3000 } = process.env;

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

module.exports = {
  mongooseUrl,
  JWT_SECRET,
  PORT,
};
