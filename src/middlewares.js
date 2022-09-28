const dbConnect = require('../services/mongo/mongodb');
const Credibility = require('../services/mongo/CredibilityModel');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

const mongoLoggerSave = (datos) =>
  new Promise(async (resolve, reject) => {
    await dbConnect();
    try {
      const data = {
        credibility: datos
      };
      await Credibility.create(data)
        .then(console.log('Credibildad guardado correctamente en mongoDB'))
        .catch((err) => console.error(err));
      resolve();
    } catch (e) {
      console.log('Error en Credibildad - save_query mongoDB');
      console.log(e);
      reject(e.message);
    }
  });

module.exports = {
  notFound,
  errorHandler,
  mongoLoggerSave
};
