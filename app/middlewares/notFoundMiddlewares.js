const notFoundMiddlewares = (req, res) => res.status(404).send({ msg: 'Route does not exist' });

module.exports = notFoundMiddlewares;
