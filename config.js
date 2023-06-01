const mongooseUrl = 'mongodb://localhost:27017/bitfilmsdb';
const mongoDbAdress = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const { PORT = 3000 } = process.env;

module.exports = {
  mongooseUrl,
  mongoDbAdress,
  PORT,
};
